export const validateProNumber = (val:string) => {
    const regex = /^\d{7,9}$/;
    
     // Check if input matches the regex for 7, 8, or 9 digits
     if (regex.test(val) || val === '') {
      return val
      
      }
      return "error"
}