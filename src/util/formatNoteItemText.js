export default function formatNoteItemText(text) {
  if (text === null || text === undefined) {
    text = 'No note text';
  }
  if (text.length > 200) {
    text = `${text.substr(0, 200)}...`;
  }

  text = text.trim();
  text = text.replace(/\n*\n/g, ' - ');

  if (text === '') {
    text = 'No note text';
  } else if (text === ' ') {
    return (text = 'No Note Text');
  } else {
    return text;
  }
}
//***************Moved to ../util/formatNoteItemText  */
// let truncatedText;
// if (text.length > 200) {
//   truncatedText = `${text.substr(0, 200)}...`;
// } else {
//   truncatedText = text;
// }

// const addDefaultText = (text) => {
//   let textToTrim = text.trim(text);
//   if (textToTrim === '') {
//     return (textToTrim = 'No Note Text');
//   } else if (textToTrim === ' ') {
//     return (textToTrim = 'No Note Text');
//   } else {
//     return textToTrim;
//   }
// };
