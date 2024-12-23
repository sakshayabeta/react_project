document.addEventListener('DOMContentLoaded', () => {
    const staffLink = document.getElementById('staff-link');
    const collectionLink = document.getElementById('collection-link');
    const contentArea = document.getElementById('content-area');

    if (staffLink) {
        staffLink.addEventListener('click', () => {
            contentArea.innerHTML = '<h2>Manage Staff</h2><p>Here you can manage staff data.</p>';
        });
    }

    if (collectionLink) {
        collectionLink.addEventListener('click', () => {
            contentArea.innerHTML = '<h2>Collection</h2><p>View or manage your collection here.</p>';
        });
    }
});