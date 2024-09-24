// resources/js/translations.js

import { usePage } from '@inertiajs/inertia-react';

const useTranslations = () => {
    const { translations } = usePage().props;

    return (key, replacements = {}) => {
        let translation = translations[key] || key;

        for (const placeholder in replacements) {
            translation = translation.replace(`:${placeholder}`, replacements[placeholder]);
        }

        return translation;
    };
};

export default useTranslations;
