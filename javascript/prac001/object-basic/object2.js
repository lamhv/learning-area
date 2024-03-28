let bandInfo;

const band = {
  name : 'Black Sabbath',
  nationality : 'British',
  genre : 'heavy metal',
  members : 4,
  formed : 1968,
  split : 2017,
  albums : [
    {
       name : 'Black Sabbath',
       released : 1970
    },
    {
       name : 'Paranoid',
       released : 1970
    },
    {
       name : 'Master of Reality',
       released : 1971
    },
    {
       name : 'Vol. 4',
       released : 1972
    }
  ]
}

// backticks (`) 
bandInfo = `The ${ band.nationality } ${ band.genre } band ${ band.name } were active ${ band.formed }–${ band.split }. Their first album, ${ band.albums[0].name }, was released in ${ band.albums[0].released }.`;
console.log(bandInfo);
