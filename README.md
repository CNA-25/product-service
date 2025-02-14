# Product API - E-handelsprojekt  

Detta API hanterar produktinformationen för vår e-handelsplattform som säljer hantverksöl. API:et följer REST-standard och använder unika produktkoder (t.ex. SKU eller artikelnummer) för att identifiera produkter, istället för databas-ID:n.  

## Funktionalitet  
- Lägg till nya produkter  
- Hämta information om produkter  
- Uppdatera produktinformation  
- Ta bort produkter  

## Endpoints  

### Hämta alla produkter  
**GET /api/products**  
- **Beskrivning:** Hämtar en lista över alla produkter.  
- **Svarsexempel:**

```
{
    "msg": "Produkter hämtades.",
    "products": [
        {
            "sku": "123-USL",
            "name": "Pale Ale",
            "price": 59.99,
            "description": "En fruktig och frisk pale ale.",
            "image": "/uploads/pale-ale.jpg",
            "created_at": "2024-01-01T20:54:00Z",
            "updated_at": "2024-01-01T20:54:00Z"
        },
        {
            "sku": "456-BEA",
            "name": "Belgisk Ale",
            "price": 69.99,
            "description": "En fyllig och mörk stout.",
            "image": "/uploads/belgian-ale.jpg",
            "created_at": "2024-01-01T20:54:00Z",
            "updated_at": "2024-01-01T20:54:00Z"
        }
    ]
}
```

### Hämta en specifik produkt
**GET /api/products/{sku}**
- **Beskrivning:** Hämtar information om en specifik produkt baserat på dess SKU.
- **Exempel:** GET /api/products/123-ABC
- **Svarsexempel:**

```
{
    "msg": "Produkt hämtades.",
    "product": {
        "sku": "123-USL",
        "name": "Pale Ale",
        "price": 59.99,
        "description": "En fruktig och frisk pale ale.",
        "image": "/uploads/pale-ale.jpg",
        "created_at": "2024-01-01T20:54:00Z",
        "updated_at": "2024-01-01T20:54:00Z"
    }
}
```

### Lägg till en ny produkt
**POST /api/products**
- **Beskrivning:** Lägger till en ny produkt.
- **Begäransexempel (Form-Data):**

```
Key: sku, Value: 789-GHI
Key: name, Value: IPA
Key: price, Value: 64.99
Key: description, Value: En kraftig och humlearomatisk IPA.
Key: image, Value: [UPPLADDAD BILDFIL]
```

**Svarsexempel:**

```
{
    "msg": "Ny produkt skapades!",
    "product": {
        "sku": "789-GHI",
        "name": "IPA",
        "price": 64.99,
        "description": "En kraftig och humlearomatisk IPA.",
        "image": "/uploads/ipa.jpg",
        "created_at": "2024-01-01T20:54:00Z",
        "updated_at": "2024-01-01T20:54:00Z"
    }
}
```
  
### Uppdatera en produkt
**PUT /api/products/{sku}***
- **Beskrivning:** Uppdaterar information om en befintlig produkt baserat på dess SKU.
- **Exempel:** PUT /api/products/123-ABC
- **Begäransexempel (Form-Data):**

```
Key: name, Value: Pale Ale Special Edition
Key: price, Value: 69.99
Key: image, Value: [NY_UPPLADDAD BILDFIL]
```

**Svarsexempel:**

```
{
    "msg": "Produkten uppdaterades.",
    "product": {
        "sku": "123-USL",
        "name": "Pale Ale Special Edition",
        "price": 69.99,
        "description": "En fruktig och frisk pale ale.",
        "image": "/uploads/pale-ale-special.jpg",
        "created_at": "2024-01-01T20:54:00Z",
        "updated_at": "2024-01-02T15:00:00Z"
    }
}
```

### Ta bort en produkt
**DELETE /api/products/{sku}**
- **Beskrivning:** Tar bort en produkt baserat på dess SKU.
- **Exempel:** DELETE /api/products/123-ABC
- **Svarsexempel:**

```
{
        "message": "Produkten har tagits bort."
}
```

### Exempelkod för att skapa ny produkt

```javascript
const formData = new FormData();
formData.append("sku", "789-GHI");
formData.append("name", "IPA");
formData.append("price", "64.99");
formData.append("description", "En kraftig och humlearomatisk IPA.");
formData.append("image", fileInput.files[0]); // Byt till filen

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

```
const formData = new FormData();
formData.append("name", "Updated IPA");
formData.append("price", "59.99");
formData.append("description", "Uppdaterad beskrivning.");
formData.append("image", fileInput.files[0]); // Byt till filen

fetch("https://product-service-cna-product-service.2.rahtiapp.fi/products/789-GHI", {
    method: "PUT",
    headers: { Authorization: `Bearer YOUR_TOKEN_HERE` },
    body: formData,
})
.then(response => response.json())
.then(data => console.log("Success:", data))
.catch(error => console.error("Error:", error));
```

## Produktkoder

### Format
- 123-ABC
### Hur produktkoden byggs upp
**Siffrorna (123)**
- **Id** för produkter i denna kategori
    - 100-999

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
- 101-USL → Amerikansk Lager
- 310-BEA → Belgisk Ale
- 843-GEI → Tysk IPA
- 625-IES → Irländsk Stout
- 420-CZW → Tjeckiskt Veteöl
- 625-MXP → Mexikansk Pilsner
  
