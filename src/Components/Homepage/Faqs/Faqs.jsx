import React from 'react';
import config from '../../../config.json';

export default function Faqs() {
    const { title, description, faqs } = config.faqSection;

    return (
        <section className="faq-section bg_gray pt-5">
            <div className="container pt-2">
                <div className='main-title'>
                    <h2 className="text-center heading_two mb-3">{config.faqSection.title}</h2>
                    <p className="text-center pt-1 mb-0" style={{ whiteSpace: 'pre-line' }}>{config.faqSection.description}</p>
                </div>

                <div className="accordion" id="accordionExample">
                    {faqs.map(faq => (
                        <div className="accordion-item" key={faq.id}>
                            <h2 className="accordion-header" id={`heading${faq.id}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq.id}`} aria-expanded="true" aria-controls={`collapse${faq.id}`}>
                                    {faq.question}
                                </button>
                            </h2>
                            <div id={`collapse${faq.id}`} className="accordion-collapse collapse" aria-labelledby={`heading${faq.id}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>{faq.answer}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
