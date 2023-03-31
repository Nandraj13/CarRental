import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

    render() {
        
        return (
            <>
             
               
              <div>
              
                     <h1>Welcome, Book your dream vehicle.</h1>

                   
              </div>
                <div id="carouselExample" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/130891/maruti-suzuki-grand-vitara-left-front-three-quarter3.jpeg?isig=0&wm=0" class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src="https://imgd.aeplcdn.com/1280x720/n/bw/models/colors/royal-enfield-select-model-factory-silver-1668160589941.jpg?q=100" class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src="https://autonexa.com/storage/uploads/2023/03/kia-sonet-right-front-three-quarter0_1678946706.webp" class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src="https://imgd.aeplcdn.com//642x361//n/cw/ec/132013/jawa-42-bobber-right-side-view1.gif?isig=0&q=75" class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

              
            </>
    );
  }
}
