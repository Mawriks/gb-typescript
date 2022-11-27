import { renderBlock, renderToast } from './lib.js';
var User = /** @class */ (function () {
    function User(username, avatarUrl) {
        this.username = username;
        this.avatarUrl = avatarUrl;
    }
    return User;
}());
export { User };
export function getUserData() {
    var userData = localStorage.getItem('user');
    var data = typeof userData === 'string' ? JSON.parse(userData) : undefined;
    if (typeof data === 'object' && 'username' in data && 'avatarUrl' in data) {
        return new User(data.username, data.avatarUrl);
    }
    return 'Возможно вы не залогинены!';
}
export function getFavoritesAmount() {
    var amountData = localStorage.getItem('favoritesAmount');
    var amount = typeof amountData === 'string' ? JSON.parse(amountData) : undefined;
    if (!isNaN(Number(amount))) {
        return Number(amount);
    }
    return 0;
}
export function renderUserBlock(name, avatar, favoriteItemsAmount) {
    var favoritesCaption;
    if (favoriteItemsAmount && favoriteItemsAmount > 0) {
        favoritesCaption = favoriteItemsAmount;
    }
    else {
        favoritesCaption = 'ничего нет';
    }
    var hasFavoriteItems = favoriteItemsAmount ? true : false;
    renderBlock('user-block', "\n    <div class=\"header-container\">\n      <img class=\"avatar\" src=\"".concat(avatar, "\" alt=\"").concat(name, "\" />\n      <div class=\"info\">\n          <p class=\"name\">").concat(name, "</p>\n          <p class=\"fav\">\n            <i class=\"heart-icon").concat(hasFavoriteItems ? ' active' : '', "\"></i>").concat(favoritesCaption, "\n          </p>\n      </div>\n    </div>\n    "));
}
export function renderUserInfo() {
    var user = getUserData();
    var userFavorites = getFavoritesAmount();
    if (user instanceof User && typeof userFavorites === 'number') {
        renderUserBlock(user.username, user.avatarUrl, userFavorites);
    }
    if (user instanceof User && typeof userFavorites !== 'number') {
        renderUserBlock(user.username, user.avatarUrl);
    }
    if (typeof user === 'string') {
        renderToast({
            text: "".concat(user),
            type: 'success',
        }, {
            name: 'Понял',
            handler: function () {
                console.log('Уведомление закрыто');
            },
        });
        renderBlock('user-block', "<br/><p>".concat(user, "</p>"));
    }
}
