document.addEventListener('DOMContentLoaded', function() {
  var videoPlayer = document.getElementById('video-player');
  var playPauseButton = document.getElementById('play-pause-button');
  var volumeUpButton = document.getElementById('volume-up-button');
  var volumeDownButton = document.getElementById('volume-down-button');
  var fileInput = document.getElementById('file-input');
  var volumeBar = document.getElementById('volume-bar');
  var volumeFill = document.createElement('div');
  volumeFill.id = 'volume-fill';
  volumeBar.appendChild(volumeFill);

  playPauseButton.addEventListener('click', function() {
    if (videoPlayer.paused || videoPlayer.ended) {
      videoPlayer.play();
      playPauseButton.textContent = '⏸';
    } else {
      videoPlayer.pause();
      playPauseButton.textContent = '▶';
    }
  });

  volumeUpButton.addEventListener('click', function() {
    if (videoPlayer.volume < 1) {
      videoPlayer.volume += 0.1;
    }
    showVolumeBar();
    updateVolumeBar();
  });

  volumeDownButton.addEventListener('click', function() {
    if (videoPlayer.volume > 0) {
      videoPlayer.volume -= 0.1;
    }
    showVolumeBar();
    updateVolumeBar();
  });

  function showVolumeBar() {
    volumeBar.style.display = 'block';
    setTimeout(function() {
      volumeBar.style.display = 'none';
    }, 3000);
  }

  function updateVolumeBar() {
    var fillWidth = (videoPlayer.volume * 100) + '%';
    volumeFill.style.width = fillWidth;
  }
  fileInput.addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file.type.startsWith('video/')) {
      var fileURL = URL.createObjectURL(file);
      
      // Mostrar el mensaje de carga
      var loadingMessage = document.getElementById('loading-message');
      loadingMessage.style.display = 'block';
  
      // Retrasar la carga del video por 2 segundos
      setTimeout(function() {
        videoPlayer.src = fileURL;
        videoPlayer.load();
        videoPlayer.addEventListener('loadedmetadata', function() {
          URL.revokeObjectURL(fileURL);
          playPauseButton.disabled = false;
          volumeUpButton.disabled = false;
          volumeDownButton.disabled = false;
          updateVolumeBar();
          
          // Ocultar el mensaje de carga después de cargar el video
          loadingMessage.style.display = 'none';
        });
      }, 3000);
    } else {
      alert('Por favor, selecciona un archivo de vídeo válido.');
    }
  });
  

   // Modificamos el estilo y texto del botón de archivo "Browse"
   fileInput.style.display = 'none';
   var browseButton = document.createElement('button');
   browseButton.textContent = 'Buscar vídeo';
   browseButton.style.backgroundColor = '#000';
   browseButton.style.color = '#fff';
   browseButton.style.padding = '10px 20px';
   browseButton.style.border = 'none';
   browseButton.style.borderRadius = '4px';
   browseButton.style.cursor = 'pointer';
   browseButton.style.marginBottom = '20px';
   browseButton.style.marginTop = '-30px';
   browseButton.style.transform = 'translateX(-50%)';
   browseButton.style.position = 'relative';
   browseButton.style.left = '50%';
   fileInput.parentNode.insertBefore(browseButton, fileInput);
 
   browseButton.addEventListener('click', function() {
     fileInput.click();
  });
});
