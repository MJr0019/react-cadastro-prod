clear
printf "==============  Instalando Dependencias do Projeto =============="
printf "\n"
printf "\n"
    if [ -d "./node_modules" ]; then
        sudo rm -rf "./node_modules"
    else 
        printf "\n"
    fi
npm i
printf "\n"
printf "============  Dependencias Instaladas com Sucesso  ===========\n"
printf "\n" 
printf "\n" 
./run/linux/run.sh
printf "\n" 