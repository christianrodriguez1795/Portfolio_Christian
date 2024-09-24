import React, { useState } from 'react';

const CustomSections = () => {
    const [sections, setSections] = useState([]);
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [newSectionContent, setNewSectionContent] = useState('');

    const handleAddSection = () => {
        setSections([...sections, { id: Date.now(), title: newSectionTitle, content: newSectionContent }]);
        setNewSectionTitle('');
        setNewSectionContent('');
    };

    const handleRemoveSection = (id) => {
        setSections(sections.filter(section => section.id !== id));
    };

    const handleSectionChange = (id, name, value) => {
        const updatedSections = sections.map(section => 
            section.id === id ? { ...section, [name]: value } : section
        );
        setSections(updatedSections);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Customizable Sections</h2>
            {sections.map(section => (
                <section key={section.id} className="mb-4 p-4 border rounded shadow">
                    <input 
                        type="text" 
                        value={section.title}
                        onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                        placeholder="Section Title"
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                        placeholder="Section Content"
                        className="w-full p-2 mb-2 border rounded"
                    />
                    <button 
                        onClick={() => handleRemoveSection(section.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Remove
                    </button>
                </section>
            ))}
            <div className="new-section mb-4">
                <input 
                    type="text" 
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="New Section Title"
                    className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                    value={newSectionContent}
                    onChange={(e) => setNewSectionContent(e.target.value)}
                    placeholder="New Section Content"
                    className="w-full p-2 mb-2 border rounded"
                />
                <button 
                    onClick={handleAddSection}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Section
                </button>
            </div>
        </div>
    );
};

export default CustomSections;
