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