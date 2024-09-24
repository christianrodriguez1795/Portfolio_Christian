import React from 'react';

const SectionContainer = React.forwardRef(({ title, children, className }, ref) => {
    return (
        <section ref={ref} className={`min-h-screen py-12 px-10 flex flex-col ${className}`}>
            <div data-aos="fade-down" className='text-center pb-5 md:pb-8 z-50'>
                <h3 className="text-4xl font-semibold">{title}</h3>
            </div>
            <div className='w-full md:inline-flex gap-6 flex-grow'>
                {children}
            </div>
        </section>
    );
});

export default SectionContainer;

