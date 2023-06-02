import SaskPolyLogo from '../../assets/logos/Saskatchewan_Polytechnic.png';
import SWFLogo from '../../assets/logos/SWF-Logo.png'

/**
 * Logo Image
 * @returns Image element
 */
const Logo = () => {
    return(
        <>
            <img src={SaskPolyLogo}
            alt="SaskPolylogo"
            height="50"
            style={{ marginRight: '20px' , marginLeft: '10px' }}
            />
            <img src={SWFLogo}
            height="50"
            style={{ marginRight: '20px', backgroundColor: 'white' }}          
            alt="SWFlogo"/>
        </>
        
    );
};

export default Logo;
