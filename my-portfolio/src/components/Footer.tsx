import { useTranslations } from "../translations"
import translations from "../translations/page"

const Footer = () => {
  const {T} = useTranslations(translations)

  return <>
    {/* <!-- ======= Footer ======= --> */}
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="copyright-box">
              <p className="copyright">&copy; Copyright <strong>DevFolio</strong>. {T.footer.AllRightReserved}</p>
              <div className="credits">
                {/* <!--
                  All the links in the footer should remain intact /.
                  You can delete the links only if you purchased the pro version /.
                  Licensing information: https://bootstrapmade.com/license/
                  Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=DevFolio
                --> */}
                {T.footer.DesignedBy} <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}
export default Footer
