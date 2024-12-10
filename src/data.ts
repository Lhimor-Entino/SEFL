
export const entry_data ={
  "proNumber": "Unique PRO number (e.g., tracking number or reference ID)",
  "type": "Type of freight or transaction (e.g., LTL, FTL, OSD, etc.)",
  "masterProNumber": "Master PRO number (must not be equal to proNumber)",
  "osd": "Details about Overage, Shortage, or Damage (optional)",
  "terms": "Payment terms or agreement (e.g., Prepaid, Collect, etc.)",
  "consignee": {
      "name": "Company name or recipient's name (priority: company name)",
      "address1": "Primary street address",
      "address2": "Secondary address (optional)",
      "contactName": "Contact person or department (must not match 'name')",
      "contactNumber": "Phone number of the contact person/department",
      "city": "City of the consignee",
      "state": "State or province",
      "zip": "ZIP or postal code"
  },
  "shipper": {
      "name": "Company name or shipper's name (priority: company name)",
      "address1": "Primary street address",
      "address2": "Secondary address (optional)",
      "contactName": "Contact person or department (must not match 'name')",
      "contactNumber": "Phone number of the contact person/department",
      "city": "City of the shipper",
      "state": "State or province",
      "zip": "ZIP or postal code"
  },
  "billTo": {
      "name": "Company name or bill-to name (priority: company name)",
      "address1": "Primary street address",
      "address2": "Secondary address (optional)",
      "contactName": "Contact person or department (must not match 'name')",
      "contactNumber": "Phone number of the contact person/department",
      "city": "City of the bill-to party",
      "state": "State or province",
      "zip": "ZIP or postal code"
  },
  "billClerk": "Name or ID of the billing clerk",
  "il": "Interline details (if applicable)",
  "date": "Date of transaction or creation (format: YYYY-MM-DD)",
  "pickupDate": "Pickup date (format: YYYY-MM-DD)",
  "term": "Payment terms or agreement (e.g., Prepaid, Collect, etc.)",
  "weight": "Total weight of the shipment (in pounds or kilograms)",
  "ilPro": "Interline PRO number (if applicable)",
  "bills": "Total number of bills",
  "puTrailer": "Pickup trailer number or identifier",
  "orig": "Origin terminal or location code",
  "dest": "Destination terminal or location code",
  "shc": "Special handling code (if applicable)",
  "specialInstructions": [
      "List of special instructions (e.g., 'Do not stack', 'Fragile')"
  ],
  "plt": "Total number of pallets (integer value)",
  "lpsc": "Load plan stop code or identifier",
  "tpcs": "Total pieces",
  "items": [
      {
          "charge": "Charge amount for this item (numeric value)",
          "pieces": "Number of pieces for this item",
          "hm": "Is the item hazardous material? (true/false)",
          "ref": "Reference number for this item (if applicable)",
          "description": "Description of the item",
          "weight": "Weight of this item (numeric value)",
          "sqYds": "Square yards (if applicable)",
          "class": "Freight class code (if applicable)"
      }
  ],
  "referenceNumbers": [
    {
      "id": null,
      "value": "4520532180",
      "piece": null,
      "weight": "1137",
      "relatedValue": null
    },
    {
      "id": null,
      "value": "4521398440",
      "piece": null,
      "weight": "1308",
      "relatedValue": null
    },
    {
        "id": null,
        "value": "812563134",
        "piece": null,
        "weight": null,
        "relatedValue": "8951331"
    },
        {
        "id": null,
        "value": "812568689",
        "piece": null,
        "weight": null,
        "relatedValue": "8951343"
    }

  ],
  "accOrIns": [
      {
          "code": "Code for the account or insurance (if applicable)",
          "description": "Description of the account or insurance (if applicable)"
      }
  ]
}