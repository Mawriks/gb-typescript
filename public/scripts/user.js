import { renderBlock } from './lib.js';
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
    return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkM7SUFHRSxjQUFZLFFBQWdCLEVBQUUsU0FBaUI7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQzs7QUFFRCxNQUFNLFVBQVUsV0FBVztJQUN6QixJQUFNLFFBQVEsR0FBWSxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELElBQU0sSUFBSSxHQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzdFLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtRQUN6RSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2hEO0lBRUQsT0FBTyw0QkFBNEIsQ0FBQztBQUN0QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQjtJQUNoQyxJQUFNLFVBQVUsR0FBWSxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDcEUsSUFBTSxNQUFNLEdBQ1YsT0FBTyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtRQUMxQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2QjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQzdCLElBQVksRUFDWixNQUFjLEVBQ2QsbUJBQTRCO0lBRTVCLElBQUksZ0JBQWlDLENBQUM7SUFDdEMsSUFBSSxtQkFBbUIsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLEVBQUU7UUFDbEQsZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUM7S0FDeEM7U0FBTTtRQUNMLGdCQUFnQixHQUFHLFlBQVksQ0FBQztLQUNqQztJQUVELElBQU0sZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRTVELFdBQVcsQ0FDVCxZQUFZLEVBQ1osb0ZBRTZCLE1BQU0sc0JBQVUsSUFBSSw0RUFFekIsSUFBSSxpRkFHOUIsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxvQkFDMUIsZ0JBQWdCLHFEQUlwQixDQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcyc7XG5cbmV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgYXZhdGFyVXJsOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHVzZXJuYW1lOiBzdHJpbmcsIGF2YXRhclVybDogc3RyaW5nKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMuYXZhdGFyVXJsID0gYXZhdGFyVXJsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyRGF0YSgpOiB1bmtub3duIHtcbiAgY29uc3QgdXNlckRhdGE6IHVua25vd24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xuICBjb25zdCBkYXRhID0gdHlwZW9mIHVzZXJEYXRhID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UodXNlckRhdGEpIDogdW5kZWZpbmVkO1xuICBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICd1c2VybmFtZScgaW4gZGF0YSAmJiAnYXZhdGFyVXJsJyBpbiBkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBVc2VyKGRhdGEudXNlcm5hbWUsIGRhdGEuYXZhdGFyVXJsKTtcbiAgfVxuXG4gIHJldHVybiAn0JLQvtC30LzQvtC20L3QviDQstGLINC90LUg0LfQsNC70L7Qs9C40L3QtdC90YshJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZhdm9yaXRlc0Ftb3VudCgpOiB1bmtub3duIHtcbiAgY29uc3QgYW1vdW50RGF0YTogdW5rbm93biA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnKTtcbiAgY29uc3QgYW1vdW50ID1cbiAgICB0eXBlb2YgYW1vdW50RGF0YSA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGFtb3VudERhdGEpIDogdW5kZWZpbmVkO1xuICBpZiAoIWlzTmFOKE51bWJlcihhbW91bnQpKSkge1xuICAgIHJldHVybiBOdW1iZXIoYW1vdW50KTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclVzZXJCbG9jayhcbiAgbmFtZTogc3RyaW5nLFxuICBhdmF0YXI6IHN0cmluZyxcbiAgZmF2b3JpdGVJdGVtc0Ftb3VudD86IG51bWJlclxuKTogdm9pZCB7XG4gIGxldCBmYXZvcml0ZXNDYXB0aW9uOiBzdHJpbmcgfCBudW1iZXI7XG4gIGlmIChmYXZvcml0ZUl0ZW1zQW1vdW50ICYmIGZhdm9yaXRlSXRlbXNBbW91bnQgPiAwKSB7XG4gICAgZmF2b3JpdGVzQ2FwdGlvbiA9IGZhdm9yaXRlSXRlbXNBbW91bnQ7XG4gIH0gZWxzZSB7XG4gICAgZmF2b3JpdGVzQ2FwdGlvbiA9ICfQvdC40YfQtdCz0L4g0L3QtdGCJztcbiAgfVxuXG4gIGNvbnN0IGhhc0Zhdm9yaXRlSXRlbXMgPSBmYXZvcml0ZUl0ZW1zQW1vdW50ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIHJlbmRlckJsb2NrKFxuICAgICd1c2VyLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlci1jb250YWluZXJcIj5cbiAgICAgIDxpbWcgY2xhc3M9XCJhdmF0YXJcIiBzcmM9XCIke2F2YXRhcn1cIiBhbHQ9XCIke25hbWV9XCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJuYW1lXCI+JHtuYW1lfTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cImZhdlwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJoZWFydC1pY29uJHtcbiAgaGFzRmF2b3JpdGVJdGVtcyA/ICcgYWN0aXZlJyA6ICcnXG59XCI+PC9pPiR7ZmF2b3JpdGVzQ2FwdGlvbn1cbiAgICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgXG4gICk7XG59XG4iXX0=