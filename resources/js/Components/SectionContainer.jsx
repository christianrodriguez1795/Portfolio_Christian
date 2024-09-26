import React from 'react';

const SectionContainer = React.forwardRef(({ id, title, children, className }, ref) => {
    return (
        <section id={id} ref={ref} className={`min-h-screen pb-12 md:pt-12 px-10 flex flex-col gap-5 overflow-hidden ${className}`}>
            <div data-aos="fade-down" className='text-center md:pb-8 z-50'>
                <h3 className="text-4xl font-semibold">{title}</h3>
            </div>
            <div className='w-full flex flex-col md:inline-flex gap-6 flex-grow h-full'>
                {children}
            </div>
        </section>
    );
});

export default SectionContainer;

