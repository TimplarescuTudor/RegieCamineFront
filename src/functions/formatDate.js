export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    const date = new Date(`${dateString}-15`);
    return date.toLocaleDateString('ro-RO', options);
};