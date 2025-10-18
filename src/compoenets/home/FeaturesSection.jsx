import React, { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";

const FeaturesSection = () => {
  const { t } = useContext(LanguageContext);
  const services = t.servicesList || [
    "Easy online registration",
    "Secure and confidential data handling",
    "24/7 support and guidance",
    "Expert professionals and verified services",
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2>{t.whatOurUsersSay}</h2>
        <ul>
          {services.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturesSection;
