#!/bin/bash
# Executável RPA: instala ngrok e cria túnel para Ionic automaticamente

set -e

# Configuração
PORT=${1:-8100}   # Porta padrão do Ionic, pode passar como argumento
HOST=0.0.0.0

# Função para checar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Instala ngrok via binário oficial se não existir
if ! command_exists ngrok; then
    echo "ngrok não encontrado. Instalando..."
    cd /tmp || exit
    wget -q https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip -O ngrok.zip
    unzip -o ngrok.zip
    sudo mv ngrok /usr/local/bin/
    sudo chmod +x /usr/local/bin/ngrok
    rm ngrok.zip
    echo "ngrok instalado com sucesso!"
else
    echo "ngrok já instalado."
fi

# Inicia Ionic em 0.0.0.0
echo "Iniciando Ionic na porta $PORT..."
ionic serve --host=$HOST --port=$PORT &

IONIC_PID=$!

# Aguarda 3 segundos para o servidor iniciar
sleep 3

# Inicia túnel ngrok
echo "Iniciando túnel ngrok..."
ngrok http $PORT
NGROK_PID=$!

# Ao encerrar ngrok, mata o Ionic
trap "echo 'Encerrando Ionic...'; kill $IONIC_PID; exit" SIGINT SIGTERM

# Mantém script rodando até o usuário cancelar
wait $NGROK_PID
