import React, { Component, FormEvent, createRef } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { WithStyles } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import { Theme, createStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import ErrorPanel from "./ErrorPanel";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    uploadInput: {
      display: "none"
    },
    media: {
      height: 140,
      backgroundSize: "contain"
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    }
  });

interface Props extends WithStyles<typeof styles> {
  exercise?: undefined | { id: number; name: string; imageUrl: string; videoUrl: string; swaps: number[] };
  exercises: { id: number; name: string }[];
  onCancel: () => void;
  onSubmit: (exercise: { id: number; name: string; imageUrl: string; videoUrl: string; swaps: number[] }) => void;
  save: (data: {
    id?: number;
    name: string;
    image?: File | string;
    video?: File | string;
    swaps: number[];
  }) => Promise<{ id: number; name: string; imageUrl: string; videoUrl: string; swaps: number[] }>;
}

interface State {
  error?: string | undefined;
  loading: boolean;
  imageUrl?: string;
  videoUrl?: string;
  name?: string;
  swaps: number[];
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

const mediaPlaceholderStyles = (theme: Theme) =>
  createStyles({
    root: {
      height: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  });

interface MediaPlaceholderProps extends WithStyles<typeof mediaPlaceholderStyles> {
  text: String;
}

const MediaPlaceholder = withStyles(mediaPlaceholderStyles)(({ text, classes }: MediaPlaceholderProps) => {
  return (
    <Typography variant="body1" className={classes.root}>
      {text}
    </Typography>
  );
});

class FormDialog extends Component<Props, State> {
  imageRef = createRef<HTMLInputElement>();
  videoRef = createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    const { exercise } = props;

    const state = {
      loading: false,
      swaps: []
    };

    if (exercise) {
      Object.assign(state, exercise);
    }

    this.state = state;
  }

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements: FormElements = e.currentTarget.elements as FormElements;
    const { swaps } = this.state;

    this.setState({
      loading: true
    });

    let image, video;

    if (this.imageRef.current !== null && this.imageRef.current.files![0]) {
      image = this.imageRef.current.files![0];
    } else if (this.state.imageUrl) {
      image = this.state.imageUrl;
    }

    if (this.videoRef.current !== null && this.videoRef.current.files![0]) {
      video = this.videoRef.current.files![0];
    } else if (this.state.videoUrl) {
      video = this.state.videoUrl;
    }

    this.props
      .save({
        id: this.props.exercise ? this.props.exercise.id : undefined,
        name: elements.name.value,
        image,
        video,
        swaps
      })
      .then(exercise => {
        this.setState({
          loading: false
        });

        this.props.onSubmit(exercise);
      })
      .catch(e => this.setState({ error: e.response.data.errors.message }));
  };

  onImageRemove = () => {
    this.setState({
      imageUrl: undefined
    });

    if (this.imageRef.current !== null) {
      this.imageRef.current.value = "";
    }
  };

  onVideoRemove = () => {
    this.setState({
      videoUrl: undefined
    });

    if (this.videoRef.current !== null) {
      this.videoRef.current.value = "";
    }
  };

  onImageFileInputChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      imageUrl: URL.createObjectURL(e.currentTarget.files![0])
    });
  };

  onVideoFileInputChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      videoUrl: URL.createObjectURL(e.currentTarget.files![0])
    });
  };

  onSwapsSelected = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as number[];

    this.setState({
      swaps: value
    });
  };

  render() {
    const { onCancel, exercise, classes, exercises } = this.props;
    const { error, loading, imageUrl, videoUrl, name, swaps } = this.state;

    const filteredExercises = exercise !== undefined ? exercises.filter(({ id }) => id !== exercise.id) : exercises;

    return (
      <Dialog
        open={true}
        maxWidth="sm"
        fullWidth
        onClose={loading ? undefined : onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{exercise !== undefined ? "Edit exercise" : "Create exercise"}</DialogTitle>
        {error !== undefined && <ErrorPanel message={error} />}
        <form onSubmit={this.onSubmit}>
          <DialogContent>
            <TextField
              defaultValue={name}
              autoFocus
              margin="dense"
              required
              id="name"
              label="Name"
              type="text"
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Card>
                  <CardActionArea>
                    {imageUrl ? (
                      <CardMedia className={classes.media} image={imageUrl} />
                    ) : (
                      <MediaPlaceholder text="Image" />
                    )}
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      disabled={imageUrl === undefined}
                      onClick={this.onImageRemove}
                    >
                      Remove
                    </Button>
                    <input
                      className={classes.uploadInput}
                      id="upload-image"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={this.onImageFileInputChange}
                      ref={this.imageRef}
                    />
                    <label htmlFor="upload-image">
                      <Button size="small" component="span" variant="outlined" color="primary">
                        Upload
                      </Button>
                    </label>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item sm={6}>
                <Card>
                  <CardActionArea>
                    {videoUrl ? (
                      <CardMedia component="video" className={classes.media} src={videoUrl} controls />
                    ) : (
                      <MediaPlaceholder text="Video" />
                    )}
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      disabled={videoUrl === undefined}
                      onClick={this.onVideoRemove}
                    >
                      Remove
                    </Button>
                    <input
                      className={classes.uploadInput}
                      id="upload-video"
                      type="file"
                      accept="video/*"
                      name="video"
                      onChange={this.onVideoFileInputChange}
                      ref={this.videoRef}
                    />
                    <label htmlFor="upload-video">
                      <Button size="small" component="span" variant="outlined" color="primary">
                        Upload
                      </Button>
                    </label>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="select-multiple-chip">Swaps</InputLabel>
              <Select
                multiple
                value={swaps}
                onChange={this.onSwapsSelected}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {(selected as number[]).map((value: number) => (
                      <Chip
                        key={value}
                        label={filteredExercises.find(exercise => exercise.id === value)!.name}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {filteredExercises.map(({ name, id }) => (
                  <MenuItem key={name} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} disabled={loading} color="primary">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(FormDialog);
