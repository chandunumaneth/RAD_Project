import React from 'react'
import './testimonial.css'
import { assets } from '../../assets/assets'

function testimonial() {
  return (
    <div className="outerdiv">
        <div className="innerdiv">
          <div className="div1 eachdiv">
            <div className="userdetails">
              <div className="imgbox">
                <img src="https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-daniel.jpg" alt="Danel"/>
              </div>
              <div className="detbox">
                <p className="name">Daniel Clifford</p>
                <p className="designation">Verified Customer</p>
              </div>
            </div>
            <div className="review">
            <h4>I recently started using this food app, and it has been a game-changer. The selection is fantastic, and the delivery is always prompt. I genuinely feel that the app has made my dining experience so much better.</h4>
            <p>“ I was using several food delivery apps before I discovered this one. I was looking for a service that not only offered a wide variety of options but also had great customer service. After trying this app, I was impressed by how easy it was to use and how quickly I could get my favorite meals delivered. The last few months have been incredibly convenient - and delicious! Since I started using this app, my meal planning has become a breeze, and I've discovered so many new places to eat. ”</p>
            </div>
          </div>

          <div className="div2 eachdiv">
            <div className="userdetails">
              <div className="imgbox">
                <img src="https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jonathan.jpg" alt="test1"/>
              </div>
              <div className="detbox">
                <p className="name">Jonathan Walters</p>
                <p className="designation">Verified Customer</p>
              </div>
            </div>
            <div className="review">
            <h4>The customer service team was incredibly helpful and always ensured I had a great experience.</h4>
            <p>“ I started using this food app with little experience in navigating delivery services. Now, I can't imagine ordering food any other way.”</p>

            </div>
          </div>

          <div className="div3 eachdiv">
            <div className="userdetails">
              <div className="imgbox">
                <img src="https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-kira.jpg" alt="test2"/>
              </div>
              <div className="detbox">
                <p className="name dark">Kira Whittle</p>
                <p className="designation dark">Verified Customer</p>
              </div>
            </div>
            <div className="review dark">
            <h4>Such a game-changer for my food ordering experience. Highly recommended!</h4>
            <p>“ Before discovering this food app, I had a hard time finding a reliable and easy way to order my favorite meals. I needed a solution that offered convenience and a great selection. A friend recommended this app, and it exceeded all my expectations. The user interface is intuitive, and the customer service is top-notch. The feature that stands out the most is the quick and efficient delivery service, which has truly transformed my dining habits. I’ve often recommended this app to friends and family, and it has consistently made my life easier. Definitely a 100% recommendation! ”</p>

            </div>
          </div>
          <div className="div4 eachdiv">
            <div className="userdetails">
              <div className="imgbox">
                <img src="https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jeanette.jpg" alt="test3"/>
              </div>
              <div className="detbox">
                <p className="name dark">Jeanette Harmon</p>
                <p className="designation dark">Verified Customer</p>
              </div>
            </div>
            <div className="review dark">
            <h4>An overall wonderful and satisfying experience</h4>
            <p>“ Thank you for making my food ordering experience so enjoyable! I now have a reliable app that makes ordering meals a breeze, and it has truly enhanced my dining routine. ”</p>

            </div>
          </div>

          <div className="div5 eachdiv">
            <div className="userdetails">
              <div className="imgbox">
                <img src="https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-patrick.jpg" alt="test4"/>
              </div>
              <div className="detbox">
                <p className="name">Patrick Abrams</p>
                <p className="designation">Verified Customer</p>
              </div>
            </div>
            <div className="review">
            <h4>Outstanding support from the customer service team who genuinely care about your experience.</h4>
            <p>“ The support team at this food app is exceptional. They are always available to help with any issues and provide helpful advice, making the entire experience smooth and enjoyable. Their genuine concern for my satisfaction and their quick responses have made using the app a pleasure. The service stands out for its personal touch and the dedication of its team. It’s clear they are committed to providing top-notch customer support. ”</p>

            </div>
          </div>
        </div>
      </div>
  )
}

export default testimonial
