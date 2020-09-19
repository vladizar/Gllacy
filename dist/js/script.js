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
const map = document.querySelector('.contacts__map');

const div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = div.style.height = '50px';
document.body.append(div);
const scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();

map.style.width = "calc(100vw - " + scrollWidth + 'px)';
map.style.left = "calc((100vw - 100%) / -2 + " + Math.floor(scrollWidth / 2) + 'px)';
const popupFeedbackWrapper       = document.querySelector('.popup-wrapper_feedback');
const popupFeedback              = popupFeedbackWrapper.querySelector('.popup-feedback');
const popupFeedbackCloseButton   = popupFeedback.querySelector('.popup-feedback__close-button');
const popupFeedbackOpenButton    = document.querySelector('.contacts-article__button');
const popupFeedbackCloseDuration = 400;

function closePopup(popupWrapper, closeAnimationDuration)
{
    popupWrapper.classList.add('popup-wrapper_close');
    setTimeout(() =>
    {
        popupWrapper.classList.add('hidden');
        popupWrapper.classList.remove('popup-wrapper_close');
    }, closeAnimationDuration - 10);
}

popupFeedbackOpenButton.onclick = function (evt)
{
    evt.preventDefault();
    popupFeedbackWrapper.classList.remove('hidden');
}

popupFeedbackCloseButton.onclick = popupFeedbackWrapper.onclick = function (evt)
{
    if ((popupFeedback != evt.target && !popupFeedback.contains(evt.target)) || popupFeedbackCloseButton == evt.target)
    {
        closePopup(popupFeedbackWrapper, popupFeedbackCloseDuration);
    }
}

document.onkeydown = function (evt)
{
    if (evt.key == 'Escape')
    {
        closePopup(popupFeedbackWrapper, popupFeedbackCloseDuration);
    }
}