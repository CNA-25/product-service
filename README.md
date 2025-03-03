# Product API - E-handelsprojekt  

Detta API hanterar produktinformationen för vår e-handelsplattform som säljer hantverksöl. API:et följer REST-standard och använder unika produktkoder (t.ex. SKU eller artikelnummer) för att identifiera produkter, istället för databas-ID:n.  

## Funktionalitet  
- Lägg till nya produkter  
- Hämta information om produkter  
- Uppdatera produktinformation  
- Ta bort produkter
- 
### API
- Adress: https://product-service-cna-product-service.2.rahtiapp.fi/

### Swagger
- Adress: https://product-service-cna-product-service.2.rahtiapp.fi/api-docs/

## Endpoints  

### Hämta alla produkter  
**GET /api/products**  
- **Beskrivning:** Hämtar en lista över alla produkter.  
- **Svarsexempel:**

```json
{
  "msg": "Produkter hämtades.",
  "products": [
    {
      "id": 47,
      "sku": "10000-FIL",
      "name": "Karhu 4,6%",
      "price": "1",
      "description": "Gulbrun, medelfyllig, medelstor humlebeska, lätt maltighet, fruktig",
      "created_at": "2025-02-26T16:26:21.182Z",
      "updated_at": "2025-02-26T16:26:21.182Z",
      "image": "/uploads/1740587181163-karhu-46-burk.jpg",
      "country": "Finland",
      "category": "Lager",
      "stock": 88
    },
    {
      "id": 45,
      "sku": "10000-IES",
      "name": "Guinness",
      "price": "4.35",
      "description": "Mörkbrun, medelfyllig, medelstor humlebeska, grumlig, rostad maltighet, brödig, chokladig, lätt sotighet",
      "created_at": "2025-02-26T16:24:15.405Z",
      "updated_at": "2025-02-26T16:27:54.416Z",
      "image": "/uploads/1740587055366-guinness-draught-stout-burk.jpg",
      "country": "Irland",
      "category": "Stout & Porter",
      "stock": 0
    }
  ]
}
```

### Hämta en specifik produkt
**GET /api/products/{sku}**
- **Beskrivning:** Hämtar information om en specifik produkt baserat på dess SKU.
- **Exempel:** GET /api/products/10000-FIL
- **Svarsexempel:**

```json
{
    "msg": "Produkt hämtades.",
    "product": {
      "id": 47,
      "sku": "10000-FIL",
      "name": "Karhu 4,6%",
      "price": "1",
      "description": "Gulbrun, medelfyllig, medelstor humlebeska, lätt maltighet, fruktig",
      "created_at": "2025-02-26T16:26:21.182Z",
      "updated_at": "2025-02-26T16:26:21.182Z",
      "image": "/uploads/1740587181163-karhu-46-burk.jpg",
      "country": "Finland",
      "category": "Lager",
      "stock": 88
    }
}
```

### Hämta flera produkter med lista av SKU:n
**POST /api/products/batch**  
- **Beskrivning:** Hämtar en lista över flera produkter med lista av SKU:n.
- **Begäransexempel:**
- 
```json
{
  "product_codes": [
    "10000-FIL",
    "10000-FII"
  ]
}
```

- **Svarsexempel:**

```json
{
  "msg": "Produkter hämtades.",
  "products": [
    {
      "id": 47,
      "sku": "10000-FIL",
      "name": "Karhu 4,6%",
      "price": "1",
      "description": "Gulbrun, medelfyllig, medelstor humlebeska, lätt maltighet, fruktig",
      "created_at": "2025-02-26T16:26:21.182Z",
      "updated_at": "2025-02-26T16:26:21.182Z",
      "image": "/uploads/1740587181163-karhu-46-burk.jpg",
      "country": "Finland",
      "category": "Lager",
      "stock": 88
    },
    {
      "id": 44,
      "sku": "10000-MXL",
      "name": "Corona Extra",
      "price": "3",
      "description": "Ljusgult, lätt, liten humlebeska, sädig, fruktig, kexig, svag örtighet",
      "created_at": "2025-02-26T16:22:21.366Z",
      "updated_at": "2025-02-27T09:26:25.719Z",
      "image": "/uploads/1740586941338-corona-extra.jpg",
      "country": "Mexiko",
      "category": "Lager",
      "stock": 4
    }
  ]
}
```

### Lägg till en ny produkt
**POST /api/products**
- **Beskrivning:** Lägger till en ny produkt.
- **Begäransexempel (Form-Data):**

```
Key: country, Value: Spanien
Key: category, Value: IPA
Key: name, Value: IPA
Key: price, Value: 64.99
Key: description, Value: En kraftig och humlearomatisk IPA.
Key: image, Value: [UPPLADDAD BILDFIL]
Key: stock, Value: 5
```

- **Svarsexempel:**

```json
{
    "msg": "Ny produkt skapades!",
    "product": {
      "id": 44,
      "sku": "10000-MXL",
      "name": "Corona Extra",
      "price": "3",
      "description": "Ljusgult, lätt, liten humlebeska, sädig, fruktig, kexig, svag örtighet",
      "created_at": "2025-02-26T16:22:21.366Z",
      "updated_at": "2025-02-27T09:26:25.719Z",
      "image": "/uploads/1740586941338-corona-extra.jpg",
      "country": "Mexiko",
      "category": "Lager",
      "stock": 4
    }
}
```
  
### Uppdatera en produkt
**PUT /api/products/{sku}**
- **Beskrivning:** Uppdaterar information om en befintlig produkt baserat på dess SKU. Eftersom SKU inte går att ändra, kan man inte ändra land och kategori. 
- **Exempel:** PUT /api/products/123-ABC
- **Begäransexempel (Form-Data):**

```
Key: name, Value: Pale Ale Special Edition
Key: price, Value: 69.99
Key: description, Value: En fruktig och frisk pale ale.
Key: image, Value: [NY UPPLADDAD BILDFIL]
```

- **Svarsexempel:**

```json
{
  "msg": "Produkten uppdaterades.",
  "product": {
    "id": 44,
    "sku": "10000-MXL",
    "name": "Pale Ale Special Edition",
    "price": "69.99",
    "description": "En fruktig och frisk pale ale.",
    "created_at": "2025-02-26T16:22:21.366Z",
    "updated_at": "2025-02-27T09:26:25.719Z",
    "image": "/uploads/1740586941338-corona-extra.jpg",
    "country": "Mexiko",
    "category": "Lager",
    "stock": 4
  }
}
```

### Ta bort en produkt
**DELETE /api/products/{sku}**
- **Beskrivning:** Tar bort en produkt baserat på dess SKU.
- **Exempel:** DELETE /api/products/123-ABC
- **Svarsexempel:**

```json
{
        "message": "Produkten har tagits bort."
}
```

### Exempelkod för att skapa ny produkt

```javascript

// Dropdown meny för country (se nedan för länderna)
// Dropdown meny för category (se nedan för länderna)

const formData = new FormData();
formData.append('country', country);
formData.append('category', category);
formData.append("name", "IPA");
formData.append("price", "64.99");
formData.append("description", "En kraftig och humlearomatisk IPA.");
formData.append("image", fileInput.files[0]); // Byt till filen
formData.append("stock", 5)

fetch("https://product-service-cna-product-service.2.rahtiapp.fi/products", {
    method: "POST",
    headers: { Authorization: `Bearer YOUR_TOKEN_HERE` },
    body: formData,
})
.then(response => response.json())
.then(data => console.log("Success:", data))
.catch(error => console.error("Error:", error));
```

### Exempelkod för att uppdatera produkt

- **OBS:** Eftersom SKU inte går att ändra, kan man inte ändra land och kategori. 

```javascript
const formData = new FormData();
formData.append("name", "Updated IPA");
formData.append("price", "59.99");
formData.append("description", "Uppdaterad beskrivning.");
formData.append("image", fileInput.files[0]); // Byt till filen

fetch("https://product-service-cna-product-service.2.rahtiapp.fi/products/${sku}", {
    method: "PUT",
    headers: { Authorization: `Bearer YOUR_TOKEN_HERE` },
    body: formData,
})
.then(response => response.json())
.then(data => console.log("Success:", data))
.catch(error => console.error("Error:", error));
```

### Arrays med länder och kategorier

```javascript
const countries = [
  "Argentina", "Asien", "Belgien", "Brasilien", "Chile", "Colombia", "Danmark", "Finland", 
  "Frankrike", "Indien", "Irland", "Italien", "Japan", "Kanada", "Kina", "Mexiko", "Nederländerna", 
  "Norge", "Polen", "Ryssland", "Schweiz", "Serbien", "Sydafrika", "Sydkorea", "Spanien", 
  "Storbritannien", "Tjeckien", "Tyskland", "Ungern", "USA", "Ukraina", "Vietnam", "Österrike"
];

const categories = [
  "Ale", "IPA", "Lager", "Pilsner", "Stout & Porter", "Suröl & Specialöl", "Veteöl"
];
```

## Produktkoder

### Format
- 12345-ABC
### Hur produktkoden byggs upp
**Siffrorna (12345)**
- **Id** för produkter i denna kategori
    - 10000-99999

**Bokstäverna (ABC)**
- **Landskoder** (första två bokstäverna)
  - US → USA
  - GE → Tyskland
  - BE → Belgien
  - UK → Storbritannien
  - CZ → Tjeckien
  - MX → Mexiko
  - JP → Japan
  - CA → Kanada
  - NL → Nederländerna
  - AU → Australien
  - IE → Irland
  
- **Ölstilkoder** (tredje bokstaven)
  - L → Lager
  - A → Ale
  - I → IPA
  - S → Stout & Porter
  - W → Veteöl
  - P → Pilsner
  - O → Suröl & Specialöl

 ### Exempel på produktkoder & tolkningar
- 10001-USL → Amerikansk Lager
- 31000-BEA → Belgisk Ale
- 84300-GEI → Tysk IPA
- 62500-IES → Irländsk Stout
- 42000-CZW → Tjeckiskt Veteöl
- 62500-MXP → Mexikansk Pilsner
  
