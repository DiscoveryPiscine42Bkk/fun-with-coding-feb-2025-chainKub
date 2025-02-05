if [ "$#" -eq 0 ]; then
    echo "No arguement supplied"
    exit 1
fi


for arg in "$@"; do
    mkdir -p "ex$arg"
done