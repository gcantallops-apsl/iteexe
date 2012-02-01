#!/usr/bin/env python
# ===========================================================================
# eXe
# Copyright 2004-2005, University of Auckland
# Copyright 2006-2007 eXe Project, New Zealand Tertiary Education Commission
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#t
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
# ===========================================================================

"""
The eXe main script
"""

import decimal
import os
import sys

# Try to work even with no python path
try:
    from exe.application import Application
except ImportError, error:
    if str(error) == "No module named exe.application":
        exePath = os.path.abspath(sys.argv[0])
        exeDir  = os.path.dirname(exePath)
        pythonPath = os.path.split(exeDir)[0]
        sys.path.insert(0, pythonPath)
        from exe.application import Application
    else:
        import traceback
        traceback.print_exc()
        sys.exit(1)

def main():
    application = Application()
    application.main()

if __name__ == "__main__":
    main()
