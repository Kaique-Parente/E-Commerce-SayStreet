const normalizeSlug = (str) => {
    return str
        .toString()
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
};

export default normalizeSlug;