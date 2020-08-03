const sliderPages    = document.querySelectorAll('.offer__item');
const sliderControls = document.querySelectorAll('.offer__slider-control');

sliderControls.forEach((sliderControl, index) =>
{
    sliderControl.onclick = function ()
    {
        sliderControls.forEach((control, i) =>
        {
            control.classList.remove('offer__slider-control_active');
            sliderPages[i].classList.add('hidden');
            document.body.classList.remove('body_slide' + (i + 1));
        })
        
        document.body.classList.add('body_slide' + (index + 1));
        sliderPages[index].classList.remove('hidden');
        sliderControl.classList.add('offer__slider-control_active');
    }
})