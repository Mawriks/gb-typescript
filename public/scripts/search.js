import { dateToUnixStamp, fetchAsJson, calculateDifferenceInDays, getRemotenessByCoords } from './lib.js';
import { FlatRentSdk } from './sdk/flat-rent-sdk.js';
export class HomyProvider {
    find(data) {
        return fetchAsJson(this.convertDataToQueryString(data))
            .then((response) => {
            return this.getFullPrice(response, data);
        });
    }
    convertDataToQueryString(data) {
        let url = `${HomyProvider.apiUrl}/places?` +
            `checkInDate=${dateToUnixStamp(data.checkin)}&` +
            `checkOutDate=${dateToUnixStamp(data.checkout)}&` +
            `coordinates=${data.coordinates}`;
        if (data.maxprice != null) {
            url += `&maxPrice=${data.maxprice}`;
        }
        return url;
    }
    getFullPrice(places, data) {
        return places.map((place) => {
            place.price = place.price * calculateDifferenceInDays(data.checkin, data.checkout);
            return place;
        });
    }
}
HomyProvider.provider = 'homy';
HomyProvider.apiUrl = 'http://localhost:3030';
export class FlatRentProvider {
    find(data) {
        return FlatRentProvider.connection.search(this.convertDataToSdkData(data)).then((response) => {
            return this.convertFlatToPlace(response, data);
        });
    }
    convertFlatToPlace(response, data) {
        const splitDataCoords = (data.coordinates).split(',');
        const cords = [Number(splitDataCoords[0]), Number(splitDataCoords[1])];
        return response.map((item) => {
            return {
                id: item.id,
                name: item.title,
                image: item.photos[0],
                description: item.details,
                price: item.totalPrice,
                remoteness: getRemotenessByCoords(cords, item.coordinates),
            };
        });
    }
    convertDataToSdkData(data) {
        const sdkData = {
            city: data.city,
            checkInDate: new Date(data.checkin),
            checkOutDate: new Date(data.checkout),
            priceLimit: data.maxprice ? +data.maxprice : null
        };
        return sdkData;
    }
}
FlatRentProvider.provider = 'FlatRent';
FlatRentProvider.connection = new FlatRentSdk();
export const SortingMap = {
    asc: {
        name: 'Сначала дешевые',
        fnc: (one, two) => {
            if (one.price > two.price) {
                return 1;
            }
            else if (one.price < two.price) {
                return -1;
            }
            else {
                return 0;
            }
        }
    },
    desc: {
        name: 'Сначала дорогие',
        fnc: (one, two) => {
            if (one.price < two.price) {
                return 1;
            }
            else if (one.price > two.price) {
                return -1;
            }
            else {
                return 0;
            }
        },
    },
    near: {
        name: 'Сначала ближе',
        fnc: (one, two) => {
            if (one.remoteness > two.remoteness) {
                return 1;
            }
            else if (one.remoteness < two.remoteness) {
                return -1;
            }
            else {
                return 0;
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQ0wsZUFBZSxFQUNmLFdBQVcsRUFDWCx5QkFBeUIsRUFDekIscUJBQXFCLEVBQ3RCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE9BQU8sRUFBRSxXQUFXLEVBQWtCLE1BQU0sd0JBQXdCLENBQUM7QUFFckUsTUFBTSxPQUFPLFlBQVk7SUFLdkIsSUFBSSxDQUFDLElBQW9CO1FBQ3ZCLE9BQU8sV0FBVyxDQUFVLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3RCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUVqQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHdCQUF3QixDQUFDLElBQW9CO1FBQ25ELElBQUksR0FBRyxHQUNMLEdBQUcsWUFBWSxDQUFDLE1BQU0sVUFBVTtZQUNoQyxlQUFlLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7WUFDL0MsZ0JBQWdCLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFDakQsZUFBZSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixHQUFHLElBQUksYUFBYSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDckM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTyxZQUFZLENBQUMsTUFBZSxFQUFFLElBQW9CO1FBQ3hELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUE3QmEscUJBQVEsR0FBRyxNQUFNLENBQUM7QUFDakIsbUJBQU0sR0FBRyx1QkFBdUIsQ0FBQztBQWdDbEQsTUFBTSxPQUFPLGdCQUFnQjtJQUkzQixJQUFJLENBQUMsSUFBb0I7UUFDdkIsT0FBTyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQWlCLEVBQUUsRUFBRTtZQUVwRyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsUUFBaUIsRUFBRSxJQUFvQjtRQUNoRSxNQUFNLGVBQWUsR0FBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEUsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBVyxFQUFFLEVBQUU7WUFDbEMsT0FBYztnQkFDWixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNoQixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUN0QixVQUFVLEVBQUUscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDM0QsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVPLG9CQUFvQixDQUFDLElBQW9CO1FBQy9DLE1BQU0sT0FBTyxHQUFZO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ25DLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3JDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDbEQsQ0FBQTtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O0FBakNhLHlCQUFRLEdBQUcsVUFBVSxDQUFDO0FBQ3JCLDJCQUFVLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQW1DaEQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFPO0lBQzVCLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxpQkFBaUI7UUFDdkIsR0FBRyxFQUFFLENBQUMsR0FBVSxFQUFFLEdBQVUsRUFBRSxFQUFFO1lBQzlCLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUN6QixPQUFPLENBQUMsQ0FBQTthQUNUO2lCQUFNLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ1Y7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLENBQUE7YUFDVDtRQUNILENBQUM7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsR0FBRyxFQUFFLENBQUMsR0FBVSxFQUFFLEdBQVUsRUFBRSxFQUFFO1lBQzlCLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUN6QixPQUFPLENBQUMsQ0FBQTthQUNUO2lCQUFNLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxPQUFPLENBQUMsQ0FBQyxDQUFBO2FBQ1Y7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLENBQUE7YUFDVDtRQUNILENBQUM7S0FDRjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxlQUFlO1FBQ3JCLEdBQUcsRUFBRSxDQUFDLEdBQVUsRUFBRSxHQUFVLEVBQUUsRUFBRTtZQUM5QixJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDbkMsT0FBTyxDQUFDLENBQUE7YUFDVDtpQkFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDMUMsT0FBTyxDQUFDLENBQUMsQ0FBQTthQUNWO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxDQUFBO2FBQ1Q7UUFDSCxDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUHJvdmlkZXIsXG4gIFNlYXJjaEZvcm1EYXRhLFxuICBQbGFjZSxcbiAgU01cbn0gZnJvbSAnLi9hcHAtdHlwZXMnO1xuXG5pbXBvcnQge1xuICBkYXRlVG9Vbml4U3RhbXAsXG4gIGZldGNoQXNKc29uLFxuICBjYWxjdWxhdGVEaWZmZXJlbmNlSW5EYXlzLFxuICBnZXRSZW1vdGVuZXNzQnlDb29yZHNcbn0gZnJvbSAnLi9saWIuanMnO1xuXG5pbXBvcnQgeyBGbGF0UmVudFNkaywgaUZsYXQsIGlQYXJhbXMgfSBmcm9tICcuL3Nkay9mbGF0LXJlbnQtc2RrLmpzJztcblxuZXhwb3J0IGNsYXNzIEhvbXlQcm92aWRlciBpbXBsZW1lbnRzIFByb3ZpZGVyIHtcblxuICBwdWJsaWMgc3RhdGljIHByb3ZpZGVyID0gJ2hvbXknO1xuICBwcml2YXRlIHN0YXRpYyBhcGlVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDMwJztcblxuICBmaW5kKGRhdGE6IFNlYXJjaEZvcm1EYXRhKTogUHJvbWlzZTxQbGFjZVtdPiB7XG4gICAgcmV0dXJuIGZldGNoQXNKc29uPFBsYWNlW10+KHRoaXMuY29udmVydERhdGFUb1F1ZXJ5U3RyaW5nKGRhdGEpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnVsbFByaWNlKHJlc3BvbnNlLCBkYXRhKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0YVRvUXVlcnlTdHJpbmcoZGF0YTogU2VhcmNoRm9ybURhdGEpOiBzdHJpbmcge1xuICAgIGxldCB1cmwgPVxuICAgICAgYCR7SG9teVByb3ZpZGVyLmFwaVVybH0vcGxhY2VzP2AgK1xuICAgICAgYGNoZWNrSW5EYXRlPSR7ZGF0ZVRvVW5peFN0YW1wKGRhdGEuY2hlY2tpbil9JmAgK1xuICAgICAgYGNoZWNrT3V0RGF0ZT0ke2RhdGVUb1VuaXhTdGFtcChkYXRhLmNoZWNrb3V0KX0mYCArXG4gICAgICBgY29vcmRpbmF0ZXM9JHtkYXRhLmNvb3JkaW5hdGVzfWA7XG5cbiAgICBpZiAoZGF0YS5tYXhwcmljZSAhPSBudWxsKSB7XG4gICAgICB1cmwgKz0gYCZtYXhQcmljZT0ke2RhdGEubWF4cHJpY2V9YDtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnVsbFByaWNlKHBsYWNlczogUGxhY2VbXSwgZGF0YTogU2VhcmNoRm9ybURhdGEpOiBQbGFjZVtdIHtcbiAgICByZXR1cm4gcGxhY2VzLm1hcCgocGxhY2U6IFBsYWNlKSA9PiB7XG4gICAgICBwbGFjZS5wcmljZSA9IHBsYWNlLnByaWNlICogY2FsY3VsYXRlRGlmZmVyZW5jZUluRGF5cyhkYXRhLmNoZWNraW4sIGRhdGEuY2hlY2tvdXQpO1xuICAgICAgcmV0dXJuIHBsYWNlO1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIEZsYXRSZW50UHJvdmlkZXIgaW1wbGVtZW50cyBQcm92aWRlciB7XG4gIHB1YmxpYyBzdGF0aWMgcHJvdmlkZXIgPSAnRmxhdFJlbnQnO1xuICBwcml2YXRlIHN0YXRpYyBjb25uZWN0aW9uID0gbmV3IEZsYXRSZW50U2RrKCk7XG5cbiAgZmluZChkYXRhOiBTZWFyY2hGb3JtRGF0YSk6IFByb21pc2U8UGxhY2VbXT4ge1xuICAgIHJldHVybiBGbGF0UmVudFByb3ZpZGVyLmNvbm5lY3Rpb24uc2VhcmNoKHRoaXMuY29udmVydERhdGFUb1Nka0RhdGEoZGF0YSkpLnRoZW4oKHJlc3BvbnNlOiBpRmxhdFtdKSA9PiB7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRGbGF0VG9QbGFjZShyZXNwb25zZSwgZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRGbGF0VG9QbGFjZShyZXNwb25zZTogaUZsYXRbXSwgZGF0YTogU2VhcmNoRm9ybURhdGEpOiBQbGFjZVtdIHtcbiAgICBjb25zdCBzcGxpdERhdGFDb29yZHM6IHN0cmluZ1tdID0gKGRhdGEuY29vcmRpbmF0ZXMpLnNwbGl0KCcsJyk7XG4gICAgY29uc3QgY29yZHMgPSBbTnVtYmVyKHNwbGl0RGF0YUNvb3Jkc1swXSksIE51bWJlcihzcGxpdERhdGFDb29yZHNbMV0pXTtcbiAgICByZXR1cm4gcmVzcG9uc2UubWFwKChpdGVtOiBpRmxhdCkgPT4ge1xuICAgICAgcmV0dXJuIDxQbGFjZT57XG4gICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICBuYW1lOiBpdGVtLnRpdGxlLFxuICAgICAgICBpbWFnZTogaXRlbS5waG90b3NbMF0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRldGFpbHMsXG4gICAgICAgIHByaWNlOiBpdGVtLnRvdGFsUHJpY2UsXG4gICAgICAgIHJlbW90ZW5lc3M6IGdldFJlbW90ZW5lc3NCeUNvb3Jkcyhjb3JkcywgaXRlbS5jb29yZGluYXRlcyksXG4gICAgICB9O1xuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnREYXRhVG9TZGtEYXRhKGRhdGE6IFNlYXJjaEZvcm1EYXRhKTogaVBhcmFtcyB7XG4gICAgY29uc3Qgc2RrRGF0YTogaVBhcmFtcyA9IHtcbiAgICAgIGNpdHk6IGRhdGEuY2l0eSxcbiAgICAgIGNoZWNrSW5EYXRlOiBuZXcgRGF0ZShkYXRhLmNoZWNraW4pLFxuICAgICAgY2hlY2tPdXREYXRlOiBuZXcgRGF0ZShkYXRhLmNoZWNrb3V0KSxcbiAgICAgIHByaWNlTGltaXQ6IGRhdGEubWF4cHJpY2UgPyArZGF0YS5tYXhwcmljZSA6IG51bGxcbiAgICB9XG4gICAgcmV0dXJuIHNka0RhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFNvcnRpbmdNYXA6IFNNID0ge1xuICBhc2M6IHtcbiAgICBuYW1lOiAn0KHQvdCw0YfQsNC70LAg0LTQtdGI0LXQstGL0LUnLFxuICAgIGZuYzogKG9uZTogUGxhY2UsIHR3bzogUGxhY2UpID0+IHtcbiAgICAgIGlmIChvbmUucHJpY2UgPiB0d28ucHJpY2UpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAob25lLnByaWNlIDwgdHdvLnByaWNlKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRlc2M6IHtcbiAgICBuYW1lOiAn0KHQvdCw0YfQsNC70LAg0LTQvtGA0L7Qs9C40LUnLFxuICAgIGZuYzogKG9uZTogUGxhY2UsIHR3bzogUGxhY2UpID0+IHtcbiAgICAgIGlmIChvbmUucHJpY2UgPCB0d28ucHJpY2UpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAob25lLnByaWNlID4gdHdvLnByaWNlKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBuZWFyOiB7XG4gICAgbmFtZTogJ9Ch0L3QsNGH0LDQu9CwINCx0LvQuNC20LUnLFxuICAgIGZuYzogKG9uZTogUGxhY2UsIHR3bzogUGxhY2UpID0+IHtcbiAgICAgIGlmIChvbmUucmVtb3RlbmVzcyA+IHR3by5yZW1vdGVuZXNzKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9IGVsc2UgaWYgKG9uZS5yZW1vdGVuZXNzIDwgdHdvLnJlbW90ZW5lc3MpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19