console.log('StopPub ID-01');

function clear_pubs(){
    const defined = v => v !== null && v !== undefined;
    setInterval(() => {
        const ad = [...document.querySelectorAll('.ad-showing')][0];
        if (defined(ad)) {
            const video = document.querySelector('video');
            if (defined(video)) {
                video.currentTime = video.duration;
            }
        }
    }, 500);
};

clear_pubs();


document.addEventListener('DOMContentLoaded', function() {
    $host_msg = document.querySelector('[title="Hosted on free web hosting 000webhost.com. Host your own website for FREE."]')
    if ($host_msg != null) {
        $host_msg.parentNode.removeChild($host_msg);
    }
});

var clear_pubs_LOADED = true;