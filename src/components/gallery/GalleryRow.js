import { BrowserRouter as Router,Link } from 'react-router-dom';
import useFormattedDate from "../../hooks/useFormattedDate";

function GalleryRow({ gallery } ) {
  	const formattedDate = useFormattedDate(
		gallery ? gallery.created_at : "",
		"dd.MM.yyyy"
	);

	
	return (
		<div className="justify-content-sm-evenly gallery-row-margin">
			{gallery.images[0] && (
						<div>
							<div className="justify-content-sm-evenly gallery-row-image">
								<img src={gallery.images[0].imageUrl} width="300px" height="300px"></img>
							</div>
						</div>
					)}
						{gallery && (
					<div>
						<Link
							to={`/galleries/${gallery?.id}`}
						>
						{gallery?.name}
						</Link>
					<br />
					{gallery.user && (
						<Link to={`/authors/${gallery?.user.id}`}>
								Author: {gallery?.user?.first_name} {gallery?.user?.last_name}
						</Link>
					)
					}
					<h6>Created: {formattedDate}</h6>
				</div>
			)}
		</div>
	);
}

export default GalleryRow;