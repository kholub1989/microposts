/**
 * EasyHTTP Library
 * Library for making HTTP request
 * 
 * @version 3.0.0
 * @author Krisztian Holub  
 * @license MIT
 * 
 */

class EasyHTTP {
  // Make HTTP GET request 
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  // Make  an HTTP POST request
  async post(url, data) { 
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const resData = await response.json();
  return resData;  
  }

 // Make an HTTP PUT request
  async put(url, data) {  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const resData = await response.json();
  return resData;     
  }

  // Make an HTTP DELETE request
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const resData = await 'Resource Deleted!';
    return resData; 
  }
}

export const http = new EasyHTTP();