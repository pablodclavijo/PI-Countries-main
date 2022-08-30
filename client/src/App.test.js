import { render, screen} from '@testing-library/react';
import Card from './components/Card'


const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png"
describe('Card', ()=> {
    it('must desplay the countries information', () =>{
        render(<Card name="Argentina" image={image} continent="Americas" id="ARG"/>)
        expect(screen.queryByText(/Argentina/)).toBeInTheDocument()
        expect(screen.queryByText(/Americas/)).toBeInTheDocument()
    })
    it('should return an empty component if no argument is passed', ()=> {
      const container = render(<Card/>)
      expect(container.innerHTML).toBe()
    })
  })