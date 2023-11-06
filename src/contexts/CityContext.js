import {createContext,useState} from 'react';

const CityContext = createContext();
export const CityContextProvider = ({ children }) => {
    const [cities, setCities] = useState(["Adana", "Adiyaman", "Afyon", "Ağri", "Amasya", "Ankara", "Antalya", "Artvin", "Aydin", "Balikesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankiri", "Çorum", "Denizli", "Diyarbakir", "Edirne", "Elaziğ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kirklareli", "Kirşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanliurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kirikkale", "Batman", "Şirnak", "Bartin", "Ardahan", "Iğdir", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce" ]);
  
    return (
      <CityContext.Provider value={cities}>
        {children}
      </CityContext.Provider>
    );
  };

export default CityContext;