import React from 'react'

export default function Footer() {
    const icons = [
        {
            name:"github",
            classes:"bi bi-github"
        },
        {
            name:"facebook",
            classes:"bi bi-facebook"
        },
        {
            name:"twitter",
            classes:"bi bi-twitter"
        },
        {
            name:"instagram",
            classes:"bi bi-instagram"
        },
        {
            name:"linkedin",
            classes:"bi bi-linkedin"
        },
    ]
    return (
    <React.Fragment>
        {/* <footer>
            <div className="container mb-1">
                <div className="row justify-content-end">
                    {
                        icons.map((icon, k)=>(
                            <div className="col text-center">
                                <i key={k} className={icon.classes + " text-black"} style={{fontSize: "2rem"}}></i>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="footer-copyright text-center py-1"> © 2022 Copyright:
                Mahad Hameed
            </div>
        </footer> */}
        <footer className="page-footer font-small cyan darken-3">
        {/* Footer Elements */}
        <div className="container">
          {/* Grid row*/}
          <div className="row">
            {/* Grid column */}
            <div className="col-md-12 py-5">
              <div className="mb-5 flex-center">
                
                {
                    icons.map((icon, k)=>
                    (
                        <div className="col text-center">
                                <i key={k} className={icon.classes + " white-text me-md-5 me-3"}></i>
                        </div>
                    ))
                }
              </div>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row*/}
        </div>
        {/* Footer Elements */}
        {/* Copyright */}
        <div className="footer-copyright text-center py-3">© 2020 Copyright:
          <a href="/"> MDBootstrap.com</a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </React.Fragment>
  )
}
