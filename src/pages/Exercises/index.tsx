import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";

import apiClient from "../../utils/apiClient";

import ExercisesList from "./ExercisesList";
import FormDialog from "./FormDialog";
import Options from "./Options";
import ExercisesEmpty from "./ExercisesEmpty";

function cancellablePromise<T>(promise: T): [T | Promise<{ canceled: boolean }>, () => void] {
  let cancel = () => {};

  const racePromise = Promise.race([
    new Promise(resolve => {
      cancel = () => resolve({ canceled: true });
    }),
    promise
  ]);

  return [racePromise as T | Promise<{ canceled: true }>, cancel];
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "600px",
      maxWidth: "100%"
    }
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  exercises: { id: number; name: string; imageUrl: string; videoUrl: string; swaps: number[] }[] | undefined;
  newExerciseFormVisible: boolean;
  editExerciseFormVisible: boolean;
  editedExercise?: { id: number; name: string; imageUrl: string; videoUrl: string; swaps: number[] };
}

class ExercisesPage extends Component<Props, State> {
  state: State = {
    exercises: undefined,
    newExerciseFormVisible: false,
    editExerciseFormVisible: false
  };
  unmountCallbacks = new Set<() => void>();

  cancelablePromise(promise: Promise<any>) {
    return new Promise((resolve, reject) => {
      const [responsePromise, cancel]: [Promise<any>, () => void] = cancellablePromise(promise);

      responsePromise
        .then(result => {
          if (!result.canceled) {
            resolve(result);
          }
        })
        .catch(e => reject(e))
        .finally(() => {
          this.unmountCallbacks.delete(cancel);
        });
    });
  }

  componentDidMount() {
    this.cancelablePromise(apiClient.get("/exercises")).then((response: any) => {
      this.setState({
        exercises: response.data.exercises as {
          id: number;
          name: string;
          imageUrl: string;
          videoUrl: string;
          swaps: number[];
        }[]
      });
    });
  }

  componentWillUnmount() {
    this.unmountCallbacks.forEach(callback => callback());
  }

  onDelete = (id: number) => {
    this.cancelablePromise(apiClient.delete("/exercises/" + id)).then((response: any) => {
      this.setState({
        exercises: this.state
          .exercises!.filter(exercise => exercise.id !== id)
          .map(exercise => {
            return {
              ...exercise,
              swaps: exercise.swaps.filter(swapId => swapId !== id)
            };
          })
      });
    });
  };

  onEdit = (id: number) => {
    this.setState({
      editExerciseFormVisible: true,
      editedExercise: this.state.exercises!.find(exercise => exercise.id === id)!
    });
  };

  onShowNewExerciseForm = () => {
    this.setState({
      newExerciseFormVisible: true
    });
  };

  saveNewExercise = (exercise: { name: string; image?: File | string; video?: File | string; swaps: number[] }) => {
    const data = new FormData();

    data.append("name", exercise.name);
    data.append("swaps", JSON.stringify(exercise.swaps));

    if (typeof exercise.image !== "string" && exercise.image !== undefined) {
      data.append("image", exercise.image);
    }

    if (typeof exercise.video !== "string" && exercise.video !== undefined) {
      data.append("video", exercise.video);
    }

    return this.cancelablePromise(apiClient.post("/exercises", data)).then((response: any) => {
      return response.data.exercise;
    });
  };

  saveEditedExercise = (exercise: {
    id?: number;
    name: string;
    image?: File | string;
    video?: File | string;
    swaps: number[];
  }) => {
    const data = new FormData();

    data.append("name", exercise.name);
    data.append("swaps", JSON.stringify(exercise.swaps));

    if (exercise.image !== undefined) {
      data.append("image", exercise.image);
    }

    if (exercise.video !== undefined) {
      data.append("video", exercise.video);
    }

    return this.cancelablePromise(apiClient.put("/exercises/" + exercise.id!, data)).then((response: any) => {
      return response.data.exercise;
    });
  };

  addNewExercise = (exercise: { id: number; name: string; imageUrl: string; videoUrl: string; swaps: number[] }) => {
    this.setState({
      newExerciseFormVisible: false,
      exercises: [exercise].concat(this.state.exercises!)
    });
  };

  updateEditedExercise = (updatedExercise: {
    id: number;
    name: string;
    imageUrl: string;
    videoUrl: string;
    swaps: number[];
  }) => {
    this.setState({
      editExerciseFormVisible: false,
      exercises: this.state.exercises!.map(exercise =>
        exercise.id === updatedExercise.id ? updatedExercise : exercise
      )
    });
  };

  onCloseNewExerciseDialog = () => {
    this.setState({
      newExerciseFormVisible: false
    });
  };

  onCloseEditExerciseDialog = () => {
    this.setState({
      editExerciseFormVisible: false
    });
  };

  render() {
    const { classes } = this.props;
    const { exercises, newExerciseFormVisible, editExerciseFormVisible } = this.state;

    return (
      <div className={classes.root}>
        <Options onAddExercise={this.onShowNewExerciseForm} />
        {newExerciseFormVisible && (
          <FormDialog
            onCancel={this.onCloseNewExerciseDialog}
            save={this.saveNewExercise}
            onSubmit={this.addNewExercise}
            exercises={exercises!}
          />
        )}
        {editExerciseFormVisible && (
          <FormDialog
            onCancel={this.onCloseEditExerciseDialog}
            save={this.saveEditedExercise}
            exercise={this.state.editedExercise}
            onSubmit={this.updateEditedExercise}
            exercises={exercises!}
          />
        )}
        {exercises !== undefined ? (
          exercises.length ? (
            <ExercisesList onDelete={this.onDelete} onEdit={this.onEdit} exercises={exercises} />
          ) : (
            <ExercisesEmpty />
          )
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(ExercisesPage);
