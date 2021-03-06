import React, { Component, FormEvent, createRef } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { WithStyles } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import { Theme, createStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";

import ErrorPanel from "./ErrorPanel";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    uploadInput: {
      display: "none",
    },
    media: {
      height: 140,
      backgroundSize: "contain",
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  });

type Exercise = {
  id: number;
  name: string;
  imageUrl: string;
  videoUrl: string;
  ratio: number;
  unilateral: boolean;
  primaryMuscle?: string;
  scope?: string;
};

interface Props extends WithStyles<typeof styles> {
  exercise?: undefined | Exercise;
  exercises: { id: number; name: string }[];
  onCancel: () => void;
  onSubmit: (exercise: Exercise) => void;
  save: (data: {
    id?: number;
    name: string;
    image?: File | string;
    video?: File | string;
    ratio: number;
    unilateral: boolean;
    primaryMuscle?: string;
    scope?: string;
  }) => Promise<Exercise>;
}

interface State {
  error?: string | undefined;
  loading: boolean;
  imageUrl?: string;
  videoUrl?: string;
  name?: string;
  ratio?: number;
  unilateral: boolean;
  primaryMuscle?: string;
  scope?: string;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  ratio: HTMLInputElement;
}

const mediaPlaceholderStyles = (theme: Theme) =>
  createStyles({
    root: {
      height: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

interface MediaPlaceholderProps
  extends WithStyles<typeof mediaPlaceholderStyles> {
  text: String;
}

const MediaPlaceholder = withStyles(mediaPlaceholderStyles)(
  ({ text, classes }: MediaPlaceholderProps) => {
    return (
      <Typography variant="body1" className={classes.root}>
        {text}
      </Typography>
    );
  }
);

class FormDialog extends Component<Props, State> {
  imageRef = createRef<HTMLInputElement>();
  videoRef = createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    const { exercise } = props;

    const state = {
      loading: false,
      unilateral: false,
    };

    if (exercise) {
      Object.assign(state, exercise);
    }

    this.state = state;
  }

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements: FormElements = e.currentTarget.elements as FormElements;
    const { unilateral, primaryMuscle, scope } = this.state;

    this.setState({
      loading: true,
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
        ratio: parseFloat(elements.ratio.value),
        unilateral,
        primaryMuscle,
        scope,
      })
      .then((exercise) => {
        this.setState({
          loading: false,
        });

        this.props.onSubmit(exercise);
      })
      .catch((e) => this.setState({ error: e.response.data.errors.message }));
  };

  onImageRemove = () => {
    this.setState({
      imageUrl: undefined,
    });

    if (this.imageRef.current !== null) {
      this.imageRef.current.value = "";
    }
  };

  onVideoRemove = () => {
    this.setState({
      videoUrl: undefined,
    });

    if (this.videoRef.current !== null) {
      this.videoRef.current.value = "";
    }
  };

  onImageFileInputChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      imageUrl: URL.createObjectURL(e.currentTarget.files![0]),
    });
  };

  onVideoFileInputChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      videoUrl: URL.createObjectURL(e.currentTarget.files![0]),
    });
  };

  onUnilateralChange = (e: React.ChangeEvent<{ checked: boolean }>) => {
    this.setState({
      unilateral: e.target.checked,
    });
  };

  onPrimaryMuscleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      primaryMuscle: e.target.value as string,
    });
  };

  onScopeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      scope: e.target.value as string,
    });
  };

  render() {
    const { onCancel, exercise, classes } = this.props;
    const {
      error,
      loading,
      imageUrl,
      videoUrl,
      name,
      ratio,
      unilateral,
      primaryMuscle,
      scope,
    } = this.state;

    return (
      <Dialog
        open={true}
        maxWidth="sm"
        fullWidth
        onClose={loading ? undefined : onCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {exercise !== undefined ? "Edit exercise" : "Create exercise"}
        </DialogTitle>
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
            <TextField
              defaultValue={ratio}
              autoFocus
              margin="dense"
              required
              id="ratio"
              label="Ratio"
              inputProps={{
                step: "0.01",
              }}
              type="number"
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
                      <Button
                        size="small"
                        component="span"
                        variant="outlined"
                        color="primary"
                      >
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
                      <CardMedia
                        component="video"
                        className={classes.media}
                        src={videoUrl}
                        controls
                      />
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
                      <Button
                        size="small"
                        component="span"
                        variant="outlined"
                        color="primary"
                      >
                        Upload
                      </Button>
                    </label>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={unilateral}
                  onChange={this.onUnilateralChange}
                  value="unilateral"
                  color="primary"
                />
              }
              label="Unilateral"
            />
            <FormControl fullWidth>
              <InputLabel id="primary-muscle">Primary muscle</InputLabel>
              <Select
                labelId="primary-muscle"
                value={primaryMuscle || ""}
                onChange={this.onPrimaryMuscleChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="back">Back</MenuItem>
                <MenuItem value="chest">Chest</MenuItem>
                <MenuItem value="upper back">Upper back</MenuItem>
                <MenuItem value="shoulder">Shoulder</MenuItem>
                <MenuItem value="abs">Abs</MenuItem>
                <MenuItem value="hamstring">Hamstring</MenuItem>
                <MenuItem value="quads">Quads</MenuItem>
                <MenuItem value="glutes">Glutes</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="scope">Scope</InputLabel>
              <Select
                labelId="scope"
                value={scope || ""}
                onChange={this.onScopeChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="compound">Compound</MenuItem>
                <MenuItem value="isolated">Isolated</MenuItem>
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
