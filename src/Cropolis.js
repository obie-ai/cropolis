import React from 'react'
import CropperJS from './components/CropperJS'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
import './styles.css'

class Cropolis extends React.Component {
	constructor(props) {
		super(props)

		this.cropper = React.createRef()

		this.styles = {
			railStyle: {
				height: '5px',
				borderRadius: '4px',
				background: '#cccfd5'
			},
			trackStyle: {
				background: '#cccfd5'
			}
		}

		this.state = {
			loading: true,
			modes: {
				rotate: false,
				crop: true
			},
			zoomLevel: 50
		}
	}

	sliderHandle = (props) => {
		const style = {
			left: `${props.value}%`
		}

		return (
			<div className="handle" style={style}>
				<svg width="29px" height="29px" viewBox="0 0 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg">
				    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
				        <g id="Image-crop-proccess-Copy-2" transform="translate(-722.000000, -885.000000)">
				            <g id="Group-11" transform="translate(642.000000, 885.000000)">
				                <g id="Group-6" transform="translate(80.000000, 0.000000)">
				                    <circle id="Oval" fill="#585AFF" cx="14.5" cy="14.5" r="14.5"></circle>
				                    <path d="M11,10 L12,10 L12,19 L11,19 L11,10 Z M14,10 L15,10 L15,19 L14,19 L14,10 Z M17,10 L18,10 L18,19 L17,19 L17,10 Z" id="Combined-Shape" fill="#FFFFFF"></path>
				                </g>
				            </g>
				        </g>
				    </g>
				</svg>
			</div>
		)
	}

	zoom = (value) => {
		this.setState({
			zoomLevel: value
		})
		this.cropper.current.zoom(value)
	}

	rotateCCW = () => {
		this.cropper.current.rotateCCW()
	}

	rotateCW = () => {
		this.cropper.current.rotateCW()
	}

	toggleRotateMode = () => {
		this.setState({
			modes: {
				rotate: !this.state.modes.rotate
			}
		})
	}

	toggleCropMode = () => {
		this.setState({
			modes: {
				crop: !this.state.modes.crop
			}
		})
	}

	getCroppedImage = () => {
		let img = this.cropper.current.getCroppedImage()
		return img.toDataURL()
	}

	load = (src) => {
		this.cropper.current.load(src)
		setTimeout(() => {
			this.setState({
				zoomLevel: 50,
				loading: false
			})
		}, 500)
	}

	destroy = () => {
		this.cropper.current.destroy()
	}

	render() {
		const { loading, modes, zoomLevel } = this.state

		return (
			<div className="cropolis-app">
				<div className="crop-wrapper">
					<div className="crop-area">
						<CropperJS
							ref={this.cropper}
							modes={modes} />

						{ modes.rotate &&
							<button className="rotate-btn ccw" onClick={this.rotateCCW}>
								<svg width="22px" height="20px" viewBox="0 0 22 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
								    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								        <g id="Image-crop-proccess-Copy-3" transform="translate(-409.000000, -504.000000)" fill="#585AFF">
								            <g id="Group-12" transform="translate(395.000000, 487.000000)">
								                <g id="Group-3" transform="translate(14.000000, 17.000000)">
								                    <path d="M20.9385,6.5065 C20.0715,4.0515 18.2995,2.0805 15.9505,0.9575 C13.5995,-0.1645 10.9535,-0.3055 8.4985,0.5625 C7.1335,1.0435 5.8725,1.8395 4.8665,2.8475 L1.5005,6.0175 L1.5005,1.7525 C1.5005,1.3385 1.1645,1.0025 0.7505,1.0025 C0.3355,1.0025 0.0005,1.3385 0.0005,1.7525 L0.0005,7.7525 C0.0005,7.7905 0.0165,7.8225 0.0215,7.8605 C0.0305,7.9165 0.0345,7.9735 0.0555,8.0275 C0.0785,8.0845 0.1155,8.1315 0.1505,8.1805 C0.1695,8.2075 0.1795,8.2405 0.2045,8.2665 C0.2075,8.2695 0.2095,8.2705 0.2125,8.2725 C0.2575,8.3195 0.3155,8.3525 0.3735,8.3865 C0.4005,8.4025 0.4235,8.4275 0.4535,8.4405 C0.4825,8.4525 0.5165,8.4525 0.5475,8.4615 C0.6115,8.4805 0.6735,8.4995 0.7395,8.5005 C0.7435,8.5005 0.7465,8.5025 0.7505,8.5025 L6.7505,8.5025 C7.1645,8.5025 7.5005,8.1665 7.5005,7.7525 C7.5005,7.3385 7.1645,7.0025 6.7505,7.0025 L2.6395,7.0025 L5.9105,3.9235 C6.7765,3.0575 7.8435,2.3835 8.9985,1.9765 C11.0755,1.2425 13.3155,1.3605 15.3025,2.3115 C17.2915,3.2615 18.7905,4.9285 19.5245,7.0065 C21.0405,11.2955 18.7835,16.0185 14.4945,17.5335 C10.2025,19.0465 5.4825,16.7915 3.9665,12.5025 C3.8295,12.1115 3.4035,11.9065 3.0095,12.0455 C2.6195,12.1835 2.4155,12.6115 2.5525,13.0025 C3.9655,17.0015 7.7375,19.5055 11.7555,19.5055 C12.8315,19.5055 13.9235,19.3255 14.9945,18.9475 C20.0635,17.1565 22.7295,11.5745 20.9385,6.5065" id="Fill-1"></path>
								                </g>
								            </g>
								        </g>
								    </g>
								</svg>
							</button>
						}

						{ modes.rotate &&
							<button className="rotate-btn cw" onClick={this.rotateCW}>
								<svg width="22px" height="20px" viewBox="0 0 22 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
								    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								        <g id="Image-crop-proccess-Copy-3" transform="translate(-1279.000000, -504.000000)" fill="#585AFF">
								            <g id="Group-12-Copy" transform="translate(1290.000000, 512.000000) scale(-1, 1) translate(-1290.000000, -512.000000) translate(1265.000000, 487.000000)">
								                <g id="Group-3" transform="translate(14.000000, 17.000000)">
								                    <path d="M20.9385,6.5065 C20.0715,4.0515 18.2995,2.0805 15.9505,0.9575 C13.5995,-0.1645 10.9535,-0.3055 8.4985,0.5625 C7.1335,1.0435 5.8725,1.8395 4.8665,2.8475 L1.5005,6.0175 L1.5005,1.7525 C1.5005,1.3385 1.1645,1.0025 0.7505,1.0025 C0.3355,1.0025 0.0005,1.3385 0.0005,1.7525 L0.0005,7.7525 C0.0005,7.7905 0.0165,7.8225 0.0215,7.8605 C0.0305,7.9165 0.0345,7.9735 0.0555,8.0275 C0.0785,8.0845 0.1155,8.1315 0.1505,8.1805 C0.1695,8.2075 0.1795,8.2405 0.2045,8.2665 C0.2075,8.2695 0.2095,8.2705 0.2125,8.2725 C0.2575,8.3195 0.3155,8.3525 0.3735,8.3865 C0.4005,8.4025 0.4235,8.4275 0.4535,8.4405 C0.4825,8.4525 0.5165,8.4525 0.5475,8.4615 C0.6115,8.4805 0.6735,8.4995 0.7395,8.5005 C0.7435,8.5005 0.7465,8.5025 0.7505,8.5025 L6.7505,8.5025 C7.1645,8.5025 7.5005,8.1665 7.5005,7.7525 C7.5005,7.3385 7.1645,7.0025 6.7505,7.0025 L2.6395,7.0025 L5.9105,3.9235 C6.7765,3.0575 7.8435,2.3835 8.9985,1.9765 C11.0755,1.2425 13.3155,1.3605 15.3025,2.3115 C17.2915,3.2615 18.7905,4.9285 19.5245,7.0065 C21.0405,11.2955 18.7835,16.0185 14.4945,17.5335 C10.2025,19.0465 5.4825,16.7915 3.9665,12.5025 C3.8295,12.1115 3.4035,11.9065 3.0095,12.0455 C2.6195,12.1835 2.4155,12.6115 2.5525,13.0025 C3.9655,17.0015 7.7375,19.5055 11.7555,19.5055 C12.8315,19.5055 13.9235,19.3255 14.9945,18.9475 C20.0635,17.1565 22.7295,11.5745 20.9385,6.5065" id="Fill-1"></path>
								                </g>
								            </g>
								        </g>
								    </g>
								</svg>
							</button>
						}
					</div>

					<div className="footer"> 
			          <svg width="18px" height="15px" viewBox="0 0 18 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
			              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			                  <g id="Image-crop-proccess-Copy-2" transform="translate(-642.000000, -892.000000)" fill="#CCCFD5">
			                      <g id="Group-11" transform="translate(642.000000, 885.000000)">
			                          <path d="M0.945,20.164 L16.753,20.164 L16.753,7.945 L0.945,7.945 L0.945,20.164 Z M0.473,21.109 C0.41,21.109 0.348,21.096 0.287,21.071 C0.125,21.058 -3.30757643e-12,20.928 -3.30757643e-12,20.767 L-3.30757643e-12,7.34 C-3.30757643e-12,7.179 0.126,7.046 0.288,7.038 C0.372,7.009 0.418,7 0.473,7 L17.226,7 C17.288,7 17.351,7.012 17.411,7.038 C17.573,7.05 17.698,7.18 17.698,7.34 L17.698,20.767 C17.698,20.928 17.572,21.062 17.41,21.071 C17.326,21.099 17.28,21.109 17.226,21.109 L0.473,21.109 Z M4.96,11.236 C4.468,11.236 4.066,11.637 4.066,12.131 C4.066,12.623 4.468,13.024 4.96,13.024 C5.452,13.024 5.854,12.623 5.854,12.131 C5.854,11.637 5.452,11.236 4.96,11.236 Z M4.96,13.969 C3.945,13.969 3.121,13.145 3.121,12.131 C3.121,11.116 3.945,10.291 4.96,10.291 C5.975,10.291 6.799,11.116 6.799,12.131 C6.799,13.145 5.975,13.969 4.96,13.969 Z M2.2676,19.3141 C2.1316,19.3141 2.0026,19.2561 1.9136,19.1541 C1.8296,19.0571 1.7876,18.9331 1.7956,18.8081 C1.8036,18.6821 1.8606,18.5691 1.9556,18.4861 L7.0456,14.0031 C7.1316,13.9271 7.2426,13.8861 7.3576,13.8861 C7.4836,13.8861 7.6026,13.9351 7.6936,14.0251 L8.9836,15.3151 L11.7896,12.2401 C11.8746,12.1461 11.9946,12.0901 12.1186,12.0861 C12.2516,12.0861 12.3686,12.1271 12.4576,12.2081 L16.0496,15.5001 C16.2406,15.6761 16.2536,15.9771 16.0806,16.1681 C15.9906,16.2661 15.8626,16.3221 15.7296,16.3221 C15.6116,16.3221 15.4976,16.2791 15.4126,16.2001 L12.1696,13.2271 L9.6516,15.9841 L10.9726,17.3051 C11.0616,17.3941 11.1106,17.5121 11.1106,17.6391 C11.1106,17.7651 11.0616,17.8831 10.9726,17.9721 C10.8826,18.0631 10.7646,18.1121 10.6386,18.1121 C10.5126,18.1121 10.3936,18.0631 10.3056,17.9721 L7.3376,15.0071 L2.5796,19.1951 C2.4936,19.2721 2.3826,19.3141 2.2676,19.3141 Z" id="Combined-Shape"></path>
			                      </g>
			                  </g>
			              </g>
			          </svg>
			          <div className="slider">
				          <Slider
				          	min={1}
				          	max={100}
				          	value={zoomLevel}
				          	onChange={this.zoom}
				          	handle={this.sliderHandle}
				          	railStyle={this.styles.railStyle}
				          	trackStyle={this.styles.trackStyle} />
			          </div>
			          <svg width="34px" height="27px" viewBox="0 0 34 27" version="1.1" xmlns="http://www.w3.org/2000/svg">
			              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			                  <g id="Image-crop-proccess-Copy-2" transform="translate(-1050.000000, -886.000000)" fill="#CCCFD5">
			                      <g id="Group-11" transform="translate(642.000000, 885.000000)">
			                          <path d="M409.21,26.207 L440.081,26.207 L440.081,2.211 L409.21,2.211 L409.21,26.207 Z M441.024,1.072 C441.174,1.08 441.292,1.204 441.292,1.354 L441.292,27.064 C441.292,27.214 441.174,27.337 441.023,27.346 L440.971,27.349 L440.923,27.369 C440.847,27.401 440.768,27.418 440.687,27.418 L408.605,27.418 C408.525,27.418 408.444,27.401 408.367,27.369 L408.319,27.349 L408.269,27.346 C408.118,27.337 408,27.214 408,27.064 L408,1.354 C408,1.204 408.118,1.081 408.269,1.072 L408.32,1.069 L408.369,1.048 C408.443,1.017 408.523,1 408.605,1 L440.687,1 C440.769,1 440.848,1.017 440.921,1.048 L440.97,1.069 L441.024,1.072 Z M417.1984,8.5127 C416.0894,8.5127 415.1864,9.4147 415.1864,10.5247 C415.1864,11.6327 416.0894,12.5347 417.1984,12.5347 C418.3074,12.5347 419.2104,11.6327 419.2104,10.5247 C419.2104,9.4147 418.3074,8.5127 417.1984,8.5127 Z M417.1984,13.7457 C415.4214,13.7457 413.9754,12.3007 413.9754,10.5247 C413.9754,8.7467 415.4214,7.3017 417.1984,7.3017 C418.9744,7.3017 420.4204,8.7467 420.4204,10.5247 C420.4204,12.3007 418.9744,13.7457 417.1984,13.7457 Z M412.0421,23.9805 C411.8691,23.9805 411.7031,23.9055 411.5881,23.7745 C411.4801,23.6525 411.4271,23.4955 411.4381,23.3345 C411.4481,23.1735 411.5211,23.0275 411.6431,22.9215 L421.3901,14.3365 C421.4991,14.2405 421.6411,14.1865 421.7891,14.1865 C421.9511,14.1865 422.1041,14.2505 422.2191,14.3645 L424.9131,17.0555 L430.5001,10.9375 C430.6061,10.8195 430.7631,10.7465 430.9201,10.7395 C431.0941,10.7395 431.2431,10.7945 431.3561,10.8965 L438.2311,17.1985 C438.4761,17.4245 438.4931,17.8095 438.2701,18.0565 C438.1551,18.1795 437.9901,18.2515 437.8211,18.2515 C437.6701,18.2515 437.5241,18.1955 437.4131,18.0935 L430.9851,12.2015 L425.7671,17.9145 L428.5001,20.6455 C428.7351,20.8805 428.7351,21.2645 428.4991,21.5015 C428.3851,21.6165 428.2331,21.6795 428.0721,21.6795 C427.9121,21.6795 427.7601,21.6155 427.6451,21.4995 L421.7651,15.6235 L412.4421,23.8285 C412.3311,23.9255 412.1881,23.9805 412.0421,23.9805 Z" id="Combined-Shape"></path>
			                      </g>
			                  </g>
			              </g>
			          </svg>
			        </div>
			        <div className="actions">
			        	<div className="modes">
			        		<button className={"rotate-mode-btn " + (modes.rotate ? "active" : "")} onClick={this.toggleRotateMode}>
								<svg width="23px" height="19px" viewBox="0 0 23 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
								    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								        <g id="Icons" transform="translate(-809.000000, -980.000000)">
								            <g id="Group-3-Copy-3" transform="translate(795.000000, 964.000000)">
								                <path d="M33.6885,22.6493 L36.5105,26.4123 L34.6255,26.4123 C34.3875,28.6933 33.3265,30.8013 31.6275,32.3623 C29.8855,33.9623 27.6225,34.8443 25.2545,34.8443 C21.8655,34.8443 18.7225,33.0123 17.0535,30.0643 L16.7455,29.5183 L19.0365,29.5183 L19.1455,29.6753 C20.5395,31.6723 22.8235,32.8663 25.2545,32.8663 C29.0015,32.8663 32.1445,30.1023 32.6325,26.4123 L30.8655,26.4123 L33.6885,22.6493 Z M19.6445,23.5897 L16.8225,27.3527 L13.9995,23.5897 L16.0105,23.5897 C16.8795,19.1847 20.7485,15.9997 25.2545,15.9997 C28.2785,15.9997 31.1375,17.4647 32.9045,19.9187 L33.3205,20.4977 L31.3205,20.4977 L30.9275,20.5987 L30.7805,20.4347 C29.3705,18.8737 27.3565,17.9787 25.2545,17.9787 C23.5575,17.9787 21.8975,18.5657 20.5805,19.6307 C19.3285,20.6427 18.4305,22.0417 18.0395,23.5897 L19.6445,23.5897 Z" id="Combined-Shape"></path>
								            </g>
								        </g>
								    </g>
								</svg>
			        		</button>
			        		<button className={"crop-mode-btn " + (modes.crop ? "active" : "")} onClick={this.toggleCropMode}>
								<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
								    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								        <g id="Icons" transform="translate(-880.000000, -980.000000)">
								            <g id="Group-3-Copy-4" transform="translate(865.000000, 964.000000)">
								                <path d="M20.2895,28.8425 L27.8435,21.2895 L20.2895,21.2895 L20.2895,28.8425 Z M29.2455,30.2455 L29.2455,22.6935 L21.6925,30.2455 L29.2455,30.2455 Z M30.2375,35.5355 C29.6905,35.5355 29.2455,35.0905 29.2455,34.5435 L29.2455,32.2305 L19.2975,32.2305 C18.7505,32.2305 18.3055,31.7845 18.3055,31.2385 L18.3055,21.2895 L15.9925,21.2895 C15.4455,21.2895 15.0005,20.8445 15.0005,20.2975 C15.0005,19.7505 15.4455,19.3055 15.9925,19.3055 L18.3055,19.3055 L18.3055,16.9915 C18.3055,16.4455 18.7505,15.9995 19.2975,15.9995 C19.8445,15.9995 20.2895,16.4455 20.2895,16.9915 L20.2895,19.3055 L29.8275,19.3055 L31.8725,17.2605 C32.0605,17.0725 32.3095,16.9705 32.5735,16.9705 C32.8385,16.9705 33.0875,17.0725 33.2755,17.2605 C33.6615,17.6485 33.6615,18.2775 33.2755,18.6635 L31.2295,20.7075 L31.2295,30.2455 L33.5435,30.2455 C34.0905,30.2455 34.5355,30.6915 34.5355,31.2385 C34.5355,31.7845 34.0905,32.2305 33.5435,32.2305 L31.2295,32.2305 L31.2295,34.5435 C31.2295,35.0905 30.7845,35.5355 30.2375,35.5355 L30.2375,35.5355 Z" id="Fill-1"></path>
								            </g>
								        </g>
								    </g>
								</svg>
			        		</button>
			        	</div>
			        </div>
		        </div>
		        { loading && <div className="loading-overlay"></div> }
			</div>
		)
	}
}

export default Cropolis