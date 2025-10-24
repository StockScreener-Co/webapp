import { FooterNav } from "../FooterNav/FooterNav";

import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="Footer__container">
          <div className="Footer__info">
            <div className="Footer__socials">
              <a href="@!"></a>
              <a href="@!"></a>
              <a href="@!"></a>
            </div>
            <address className="Footer__address">
              <span>Snowball Analytics SAS</span>
              <span>914 331 640 R.C.S. LYON</span>
              <span>Greffe du tribunal de Commerce de LYON</span>
              <span>Address: LE FORUM, 27 Rue Maurice Flandin</span>
              <span>Lyon Cedex 3, 69444, France</span>
              <span>
                Email: <a
                  href="mailto:help@snowball-analytics.com"
                  className="Footer__email"
                >
                  help@snowball-analytics.com
                </a>
              </span>
            </address>
          </div>
          <FooterNav />
        </div>
      </div>
    </footer>
  );
};
