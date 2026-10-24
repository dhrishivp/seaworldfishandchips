/* Menu data. Edit items and prices here; the page builds the menu from this file.
   Fish and chip prices are from the shop's Just Eat listing. Everything else is a
   placeholder until the owner confirms. */
window.MENU = [
  {
    id: "fish",
    title: "Fish",
    note: "Fried to order in our own batter.",
    items: [
      { name: "Cod", desc: "Regular or large", price: "11.00", from: true },
      { name: "Large Haddock", price: "12.60" },
      { name: "Rock", desc: "Regular or large", price: "11.00", from: true },
      { name: "Plaice", price: "12.60" },
      { name: "Scampi", desc: "10 pieces, wholetail", price: "10.65" },
      { name: "Cod Roe", price: "4.40" },
      { name: "Fish Cake", price: "3.10" }
    ]
  },
  {
    id: "chips",
    title: "Chips & Sides",
    items: [
      { name: "Chips", desc: "Small, regular or large", price: "3.80", from: true },
      { name: "Cheesy Chips", price: "4.80" },
      { name: "Mushy Peas", price: "1.80" },
      { name: "Curry Sauce", price: "1.80" },
      { name: "Gravy", price: "1.80" },
      { name: "Onion Rings", price: "3.20" },
      { name: "Pickled Onion", price: "0.80" },
      { name: "Pickled Egg", price: "1.00" }
    ]
  },
  {
    id: "specials",
    title: "Sausages, Pies & Chicken",
    items: [
      { name: "Battered Sausage", price: "2.80" },
      { name: "Saveloy", price: "2.60" },
      { name: "Pukka Pie", desc: "Steak & kidney, or chicken & mushroom", price: "4.50" },
      { name: "Southern Fried Chicken", desc: "Two pieces", price: "5.50" },
      { name: "Chicken Nuggets", desc: "Six pieces", price: "4.20" }
    ]
  },
  {
    id: "kids",
    title: "Kids' Meals",
    note: "All served with chips and a drink.",
    items: [
      { name: "Fish Bites", price: "5.95" },
      { name: "Sausage", price: "5.50" },
      { name: "Chicken Nuggets", price: "5.50" },
      { name: "Fish Cake", price: "5.25" }
    ]
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      { name: "Cans", desc: "Coca-Cola, Diet Coke, Fanta, Sprite, Tango", price: "1.40" },
      { name: "500ml Bottles", price: "2.20" },
      { name: "Still Water", price: "1.20" },
      { name: "Fruit Shoot", price: "1.20" }
    ]
  }
];
