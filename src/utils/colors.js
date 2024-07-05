export const theme = new Map([
    ['oscuro', 'dark-theme'],
    ['claro', 'light-theme']
  ])
  
export const colores = new Map([
    ['blue', 'button-c-blue'],
    ['orange', 'button-c-orange'],
    ['purple','button-c-purple'],
    ['green', 'button-c-green'],
    ['pink', 'button-c-pink']
  ]);

export const coloresAddIcon = new Map([
    ['blue', '#0080ff'],
    ['orange', '#FF8C00'],
    ['purple','#9400D3'],
    ['green', '#006400'],
    ['pink', '#FF1493']
  ]);

export function darStylesParaSelect(colorFill){
    
    const ColorStyles = {
        control: (style) => ({
          ...style,
          width:`110%`,
          height: `40px`,
          borderRadius:`30px`,
          fontFamily:`OpenSans`,
          border: `1px solid ${colorFill}`,
          boxShadow:`none`,
  
          "&:hover":{
            border:`2px solid ${colorFill}`,
          },
  
        }),
        menu: (style) => ({
          ...style,
          fontFamily:`OpenSans`,
          marginLeft:`12px`,
        }),
        option: (style, state) => ({
          ...style,
          color: state.isSelected ? '#fff' : '#000',
          marginTop:`1px`,
          marginBottom:`1px`,
          background: state.isSelected ? `${colorFill}` : 'transparent',
  
          "&:hover": {
            color:`#fff`,
            background:`${colorFill}`,
          },
        }),
      }

    return ColorStyles
}