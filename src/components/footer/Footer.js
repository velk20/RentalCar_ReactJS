import './Footer.scss';
import linkedin from './../../img/linkedin.png';
import github from './../../img/github.png';

export function Footer() {
  return (
    <div className="footer">
      <footer className="page-footer font-small blue pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Footer Content</h5>
              <p>This is my first ReactJS project form car rental!</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3 ">
              <ul id="ul_top_hypers" className="list-unstyled">
                <li>
                  <a href="https://www.linkedin.com/in/angel-mladenov-8aa447181/">
                    <img src={linkedin} alt="Logo" />
                  </a>
                </li>

                <li>
                  <a href="#!">
                    <img src={github} alt="Logo" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2022 Copyright:
          <a href="https://github.com/velk20">Angel Mladenov</a>
        </div>
      </footer>
    </div>
  );
}
