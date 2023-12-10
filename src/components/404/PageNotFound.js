import './PageNotFound.scss'
import {Link} from "react-router-dom";

const bgImgUrl = 'https://bootdey.com/img/Content/bg1.jpg';
export function PageNotFound() {
    return (
        <section className="p-0 bg-img cover-background" style={{backgroundImage: `url(${bgImgUrl})`}}>
            <div className="container-fluid d-flex flex-column">
                <div className="row align-items-center justify-content-center min-vh-100">
                    <div className="col-md-9 col-lg-6 my-5">
                        <div className="text-center error-page">
                            <h1 className="mb-0 text-secondary">404</h1>
                            <h2 className="mb-4 text-white">{'Sorry, something went wrong! Page is not found!'}</h2>
                            <div>
                                <Link to="/" className="btn btn-info btn-lg me-sm-2 mb-2 mb-sm-0">Return to Home Page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}