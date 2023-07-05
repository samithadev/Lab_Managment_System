import React, { useEffect } from "react";
import $ from 'jquery';
import './index.css';

export default function NavBar() {
  useEffect(() => {
    const trigger = $('.hamburger');
    const overlay = $('.overlay');
    let isClosed = false;

    const hamburgerCross = () => {
      if (isClosed) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    };

    trigger.on('click', hamburgerCross);

    $('[data-toggle="offcanvas"]').on('click', () => {
      $('#wrapper').toggleClass('toggled');
    });

    // Return a cleanup function to remove event listeners
    return () => {
      trigger.off('click', hamburgerCross);
      $('[data-toggle="offcanvas"]').off('click');
    };
  }, []);

  return (
    <div id="wrapper">
      <div class="overlay"></div>

      <nav class="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
        <ul class="nav sidebar-nav">
          <div class="sidebar-header">
            <div class="sidebar-brand">
              <a href="#">Lab Managment</a></div></div>
          <li><a href="/">Home</a></li>
          <li><a href="/allLabTests">Lab Tests</a></li>
          <li><a href="/allAssistants">All Assistant</a></li>
          <li><a href="/allRequests">Test Requests</a></li>
          <li><a href="/patient">Patient</a></li>
        </ul>
      </nav>
      <button type="button" class="hamburger animated fadeInLeft is-closed" data-toggle="offcanvas">
        <span class="hamb-top"></span>
        <span class="hamb-middle"></span>
        <span class="hamb-bottom"></span>
      </button>

    </div>
  );

}

