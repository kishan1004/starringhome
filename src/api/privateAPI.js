const privateAPIList = new Set([
    'user/auth/logout',
    'admin/profiles/save',
    'admin/profiles/details',
    'admin/profiles/{id}/delete',
    'admin/products/save',
    'admin/products/details',
    'admin/products/{id}/details',
    'admin/products/{id}/modify',
    'admin/products/{id}/remove',
    'admin/testimonials/save',
    'admin/testimonials/details',
    'admin/testimonials/{id}/remove',
    'user/logout',
    'users/orders/products/favourites',
    'users/orders/products/favourites/details',
    'users/orders/products/add/to/cart',
    'users/orders/products/cart/details',
]);

export default privateAPIList

