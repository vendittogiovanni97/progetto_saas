// export async function getPublic<T>(url: string, successCallback?: (data: T) => void, errorCallback?: (error: Error) => void): Promise<T|undefined> {
//   try {
//     const response = await fetch(url, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     const json = await response.json();
//     if (response.ok) {
//        if(successCallback) successCallback(json);
//       return json;
//     } else {
//       if(errorCallback) errorCallback(new Error(`Errore ${response.status}: ${response.statusText}`));
//       return undefined;
//     }
//   } catch (error) {
//     if(errorCallback) errorCallback(error as Error);
//     return undefined;
//   }
// }

// export async function getPrivate<T>(token: string, url: string, successCallback?: (data: T) => void, errorCallback?: (error: Error) => void): Promise<T|undefined> {
//   try {
//     const response = await fetch(url, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//     });
//     const json = await response.json();
//     if (response.ok) {
//        if(successCallback) successCallback(json);
//       return json;
//     } else {
//       if(errorCallback) errorCallback(new Error(`Errore ${response.status}: ${response.statusText}`));
//       return undefined;
//     }
//   } catch (error) {
//     if(errorCallback) errorCallback(error as Error);
//     return undefined;
//   }
// }

// export async function postPublic<T>(url: string, data: unknown, successCallback?: (data: T) => void, errorCallback?: (error: Error) => void): Promise<T|undefined> {
//   try {
//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     const json = await response.json();
//     if (response.ok) {
//        if(successCallback) successCallback(json);
//       return json;
//     } else {
//       if(errorCallback) errorCallback(new Error(`Errore ${response.status}: ${response.statusText}`));
//       return undefined;
//     }
//   } catch (error) {
//     if(errorCallback) errorCallback(error as Error);
//     return undefined;
//   }
// }

// export async function createElementDefault<T>(token: string, url: string, data: unknown, successCallback?: (data: T) => void, errorCallback?: (error: Error) => void): Promise<T|undefined> {
//   try {
//     const response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//     });
//     const json = await response.json();
//     if (response.ok) {
//        if(successCallback) successCallback(json);
//       return json;
//     } else {
//       if(errorCallback) errorCallback(new Error(`Errore ${response.status}: ${response.statusText}`));
//       return undefined;
//     }
//   } catch (error) {
//     if(errorCallback) errorCallback(error as Error);
//     return undefined;
//   }
// }

// export async function updateElementDefault<T>(token: string, url: string, data: unknown, successCallback?: (data: T) => void, errorCallback?: (error: Error) => void): Promise<T|undefined> {
//   try {
//     const response = await fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//     });
//     const json = await response.json();
//     if (response.ok) {
//        if(successCallback) successCallback(json);
//       return json;
//     } else {
//       if(errorCallback) errorCallback(new Error(`Errore ${response.status}: ${response.statusText}`));
//       return undefined;
//     }
//   } catch (error) {
//     if(errorCallback) errorCallback(error as Error);
//     return undefined;
//   }
// }

// export async function deleteElementDefault<T>(token: string, url: string, successCallback?: (data: T) => void, errorCallback?: (error: Error) => void): Promise<T|undefined> {
//   try {
//     const response = await fetch(url, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//     });
//     const json = await response.json();
//     if (response.ok) {
//        if(successCallback) successCallback(json);
//       return json;
//     } else {
//       if(errorCallback) errorCallback(new Error(`Errore ${response.status}: ${response.statusText}`));
//       return undefined;
//     }
//   } catch (error) {
//     if(errorCallback) errorCallback(error as Error);
//     return undefined;
//   }
// }

/**
 * TODO: Implementazioni Future per FetchService
 * 
 * 1. Global Interceptors: Aggiungere supporto per intercettare richieste/risposte globalmente 
 *    (es. per loggare ogni chiamata o gestire errori 401 in un unico punto).
 * 
 * 2. Gestione Token Refresh: Integrare la logica di refresh automatico del token se scaduto 
 *    prima di rieseguire la chiamata fallita.
 * 
 * 3. Supporto Multipart/Form-Data: Aggiungere helper per l'upload di file.
 * 
 * 4. Metodo PATCH: Implementare updateElementPartial per aggiornamenti parziali.
 * 
 * 5. Caching: Aggiungere un meccanismo opzionale di caching per le richieste GET (getPublic/getPrivate).
 * 
 * 6. Migliore Tipizzazione Errori: Definire interfacce specifiche per gli errori ritornati dal backend
 *    invece di usare la classe Error generica.
 */
