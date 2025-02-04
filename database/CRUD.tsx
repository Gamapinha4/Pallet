export interface Item {
    name: string;
    description: string;
    quantity: number;
    minStock: number;
  }
  
  const dispatchStorageEvent = () => {
    window.dispatchEvent(new Event("localStorageUpdated"));
  };
  
  export async function CreateItem(item: Item) {
    const itens = await localStorage.getItem("lista");
    const itensArray = itens ? JSON.parse(itens) : [];
  
    localStorage.setItem("lista", JSON.stringify([...itensArray, item]));
    dispatchStorageEvent();
  }
  
  export async function ReadItem() {
    const itens = await localStorage.getItem("lista");
    return itens ? JSON.parse(itens) : [];
  }
  
  export async function UpdateItem(item: Item) {
    const itens = await localStorage.getItem("lista");
    const itensArray = itens ? JSON.parse(itens) : [];
  
    if (itensArray.length === 0) {
      return;
    }
  
    const novaLista = itensArray.filter((x: Item) => x.name !== item.name);
    localStorage.setItem("lista", JSON.stringify([...novaLista, item]));
    dispatchStorageEvent();
  }
  
  export async function DeleteItem(item: Item) {
    const itens = await localStorage.getItem("lista");
    const itensArray = itens ? JSON.parse(itens) : [];
  
    if (itensArray.length === 0) {
      return;
    }
  
    const novaLista = itensArray.filter((x: Item) => x.name !== item.name);
    localStorage.setItem("lista", JSON.stringify(novaLista));
    dispatchStorageEvent();
  }
  