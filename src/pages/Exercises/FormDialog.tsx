import React, { Component, FormEvent, createRef } from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { WithStyles } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import { Theme, createStyles } from "@material-ui/core/styles";

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
    }
  });

interface Props extends WithStyles<typeof styles> {
  exercise?: undefined | { id: number; name: string; imageUrl: string };
  onCancel: () => void;
  onSubmit: (exercise: { id: number; name: string; imageUrl: string }) => void;
  save: (data: {
    id?: number;
    name: string;
    image?: File | string;
  }) => Promise<{ id: number; name: string; imageUrl: string }>;
}

interface State {
  error?: string | undefined;
  loading: boolean;
  imageUrl?: string;
  name?: string;
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

  constructor(props: Props) {
    super(props);

    const { exercise } = props;

    this.state = {
      loading: false,
      imageUrl: exercise && exercise.imageUrl,
      name: exercise && exercise.name
    };
  }

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements: FormElements = e.currentTarget.elements as FormElements;

    this.setState({
      loading: true
    });

    let image;

    if (this.imageRef.current !== null && this.imageRef.current.files![0]) {
      image = this.imageRef.current.files![0];
    } else if (this.state.imageUrl) {
      image = this.state.imageUrl;
    }

    this.props
      .save({
        id: this.props.exercise ? this.props.exercise.id : undefined,
        name: elements.name.value,
        image
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

  onImageFileInputChange = (e: FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.files);
    // console.log(target);

    this.setState({
      imageUrl: URL.createObjectURL(e.currentTarget.files![0])
    });

    // this.uploader.methods.reset();
    // this.uploader.methods.addFiles([target], { confirmed: false });

    // const [file] = this.uploader.methods.getUploads();

    // this.setState({
    //   imageUpload: {
    //     loading: true,
    //     uuid: file.uuid
    //   }
    // });

    // this.uploader.methods.setName(0, file.uuid);

    // setTimeout(() => this.uploader.methods.uploadStoredFiles());
  };

  render() {
    const { onCancel, exercise, classes } = this.props;
    const { error, loading, imageUrl, name } = this.state;

    return (
      <Dialog
        open={true}
        maxWidth={"xs"}
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
                  // disabled={this.isUploadInProgress()}
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
                  // disabled={this.isUploadInProgress()}
                />
                <label htmlFor="upload-image">
                  <Button
                    size="small"
                    component="span"
                    variant="outlined"
                    color="primary"
                    // disabled={this.isUploadInProgress()}
                  >
                    Upload
                  </Button>
                </label>
              </CardActions>
            </Card>
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
