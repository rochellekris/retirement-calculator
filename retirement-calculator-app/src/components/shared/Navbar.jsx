function Navbar() {

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="">Retirement Calculator</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="https://github.com/rochellekris/retirement-calculator" >See Github</a>
                            </li>
                        </ul>                        
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar