# Movie Guide

Movie Guide, kullanıcıların çeşitli filmleri arayabileceği, favori filmlerini işaretleyebileceği ve sayfalama yapabileceği bir React uygulamasıdır. Uygulama, OMDb API'sini kullanarak film bilgilerini sağlar ve kullanıcı deneyimini geliştirmek için SCSS ile özelleştirilmiş stiller içerir. Ayrıca, favori filmler yerel depolamada saklanır.

## Özellikler

- **Film Listeleme:** Filmler, ad, çıkış tarihi ve IMDb ID'si ile birlikte grid şeklinde listelenir.
- **Sayfalama:** Her sayfada 10 film görüntülenir.
- **Arama:** Film adını arayarak film arayabilir. Varsayılan olarak "Pokemon" ile arama yapılır.
- **Yıl Filtreleme:** Kullanıcılar belirli bir yıl içinde çıkan filmleri listeleyebilir.
- **Tür Seçimi:** Kullanıcılar sadece filmleri, TV dizilerini veya TV dizisi bölümlerini arayabilir.
- **Film Detayları:** Kullanıcılar bir filme tıkladığında, filme ait detayları (poster, başlık, süre, tür, yönetmen, oyuncular, IMDb puanı vb.) içeren detay sayfasına yönlendirilir.
- **Favoriler:** Kullanıcılar beğendikleri filmleri favorilere ekleyebilir ve favorileri temizleyebilir. Favoriler yerel depolamada saklanır.
- **Filtre Temizleme:** Arama ve filtreleme seçeneklerini temizlemek için bir buton mevcut.

## Teknolojiler

- **React:** Kullanıcı arayüzü oluşturmak için.
- **React-Bootstrap:** Kullanıcı arayüzü bileşenleri için.
- **React Router:** Sayfalar arasında geçiş yapmak için.
- **OMDb API:** Film verilerini sağlamak için.
- **SCSS:** Özel stil düzenlemeleri için.
- **Local Storage:** Favori filmleri saklamak için.

## Kurulum

1. Bu projeyi bilgisayarınıza klonlayın:
    ```bash
    git clone https://github.com/elffbykll/movie-guide-react.git
    ```

2. Proje dizinine gidin:
    ```bash
    cd movie-guide
    ```

3. Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

4. Uygulamayı başlatın:
    ```bash
    npm start
    ```

## Kullanım

- **Ana Sayfa:** Uygulama başladığında, varsayılan olarak "Pokemon" ile arama yapılır ve sonuçlar grid şeklinde görüntülenir.
- **Arama:** Film adını girerek arama yapabilirsiniz.
- **Yıl ve Tür Filtreleme:** Arama kutusunun yanında yıl ve tür filtreleme seçeneklerini kullanarak aramanızı daraltabilirsiniz.
- **Favoriler:** Filmleri favorilere eklemek veya çıkarmak için kalp simgesine tıklayın. Favoriler yerel depolamada saklanır ve filtre temizleme butonunu kullanarak tüm filtreleri sıfırlayabilirsiniz.
- **Film Detayları:** Bir filme tıkladığınızda, film detaylarının yer aldığı sayfaya yönlendirilirsiniz.
- **Sayfalama:** Sayfalama butonlarını kullanarak arama sonuçlarını gezebilirsiniz.

## API Kullanımı

Bu proje, [OMDb API](http://www.omdbapi.com/) kullanarak film verilerini sağlar. API anahtarını almak için [OMDb API web sitesine](http://www.omdbapi.com/) kaydolmanız gerekmektedir. Anahtarınızı `./api/omdpApi.js` dosyasında API_KEY değerine eklemeyi unutmayın.