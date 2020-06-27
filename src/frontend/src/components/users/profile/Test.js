import React, { useState, useCallback, useRef, useEffect, Fragment } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const pixelRatio = 4;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
	const tmpCanvas = document.createElement('canvas');
	tmpCanvas.width = newWidth;
	tmpCanvas.height = newHeight;

	const ctx = tmpCanvas.getContext('2d');
	ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

	return tmpCanvas;
}

function generateDownload(previewCanvas, crop) {
	if (!crop || !previewCanvas) {
		return;
	}

	const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

	canvas.toBlob(
		(blob) => {
			const previewUrl = window.URL.createObjectURL(blob);

			const anchor = document.createElement('a');
			anchor.download = 'cropPreview.png';
			anchor.href = URL.createObjectURL(blob);
			anchor.click();

			window.URL.revokeObjectURL(previewUrl);
		},
		'image/png',
		1
	);
}

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ upImg, setUpImg ] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [ crop, setCrop ] = useState({ unit: '%', width: 50, aspect: 1 / 1 });
  const [ completedCrop, setCompletedCrop ] = useState(null);

  const onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener('load', () => setUpImg(reader.result));
          reader.readAsDataURL(e.target.files[0]);
          handleOpen();
      }
  };

  const onLoad = useCallback((img) => {
      imgRef.current = img;
  }, []);

  useEffect(
      () => {
          if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
              return;
          }

          const image = imgRef.current;
          const canvas = previewCanvasRef.current;
          const crop = completedCrop;

          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;
          const ctx = canvas.getContext('2d');

          canvas.width = crop.width * pixelRatio;
          canvas.height = crop.height * pixelRatio;

          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingEnabled = false;

          ctx.drawImage(
              image,
              crop.x * scaleX,
              crop.y * scaleY,
              crop.width * scaleX,
              crop.height * scaleY,
              0,
              0,
              crop.width,
              crop.height
          );
      },
      [ completedCrop ]
  );
  return (
    <div>
      			<div>
				<label htmlFor="profileImg"><Avatar alt="" src="/static/frontend/images/unicorn.png" className={classes.large} /></label>
				<input id="profileImg" type="file" accept="image/*" onChange={onSelectFile} className="d-none" />
			</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <div className="d-flex flex-column">
						<div className="d-flex justify-content-between p-2">
							<ReactCrop
								src={upImg}
								onImageLoaded={onLoad}
								crop={crop}
								onChange={(c) => setCrop(c)}
								onComplete={(c) => setCompletedCrop(c)}
								className="w-50"
							/>
							<div className="text-center w-50 p-2">
								<canvas
									ref={previewCanvasRef}
									style={{
										width: '100%',
										height: '100%',
										borderRadius: '50%'
									}}
								/>
							</div>
						</div>
						<Button color="primary" className="clearfix w-100 mt-5">
							OK
						</Button>
					</div>
        </Fade>
      </Modal>
    </div>
  );
}
