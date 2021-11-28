import { useState, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom'
import { generatePalette } from './colorHelper'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './Page'
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import seedColors from './seedColors'

function App() {

  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
  const [palettes, setPalettes] = useState(savedPalettes||seedColors)
  
  const findPalette =  id => {
   return palettes.find(function(palette) {
    return  palette.id === id
   })
  }

  const savePalette = newPalette => {
      setPalettes([...palettes, newPalette])
  }

 const removePalette = (paletteName) => {
        setPalettes(palettes.filter(palette => (
          palette.paletteName !== paletteName
      )))
}


  useEffect(() => (
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  ),[palettes])
  
  
  return (
    <div className="App">
    <Route render={({location}) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Switch location={location}>
            
              <Route 
              exact 
              path='/palette/newPalette' 
              render={(routesProps) =>
              <Page>  
                <NewPaletteForm 
              savePalette = {savePalette} 
              palettes={palettes} {...routesProps}/>
              </Page>
              }
              />
              
              <Route 
              exact 
              path='/' 
              render = {(routeProps) =>
              <Page>
                <PaletteList
              palettes = {palettes} 
              removePalette= {removePalette} {...routeProps}/>
              </Page>
              }/>
          
              <Route 
              exact 
              path='/palette/:id' 
              render = {(routeProps) =>
              <Page>
                 <Palette 
              palette = {generatePalette(findPalette(routeProps.match.params.id))}/> 
              </Page>
              }/>
                
              <Route 
              exact 
              path="/palette/:paletteId/:colorId" 
              render =  {(routeProps) => 
              <Page>
              <SingleColorPalette 
              palette = {generatePalette(findPalette(routeProps.match.params.paletteId))} 
              colorId={routeProps.match.params.colorId}/>
              </Page>}
              />
              <Route 
              render = {(routeProps) =>
              <Page>
                <PaletteList
              palettes = {palettes} 
              removePalette= {removePalette} {...routeProps}/>
              </Page>
              }/>
            </Switch>
        </CSSTransition>
    </TransitionGroup>
    )}/>
    </div>
  );
}

export default App;
