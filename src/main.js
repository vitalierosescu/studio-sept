import global from './global'

// Main function to determine which scripts to run
function main() {
  const pageWrapper = document.querySelector('.page-wrapper')
  global()

  if (pageWrapper.classList.contains('home')) {
    // handleHomePage()
  } else if (pageWrapper.classList.contains('invest')) {
    // handleInvestPage()
  }
}

main()
